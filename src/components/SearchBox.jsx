import React, { useEffect, useMemo, useRef, useState } from "react";
import Multiply from "../assets/icon/Multiply.svg";
import "../css/SearchBox.css";

function useDebounce(value, delay = 250) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return v;
}

async function fetchSuggestions(q) {
  if (!q) return { grounds: [], teams: [] };
  const res = await fetch(`/api/search?q=${encodeURIComponent(q)}&limit=5`);
  if (!res.ok) return { grounds: [], teams: [] };
  const json = await res.json(); // { grounds:[{id,name}], teams:[{id,name}] }
  return {
    grounds: (json.grounds || []).map((x) => ({
      type: "ground",
      id: x.id,
      name: x.name,
    })),
    teams: (json.teams || []).map((x) => ({
      type: "team",
      id: x.teamCode ?? x.id,
      name: x.name,
    })),
  };
}

const LS_KEY = "recent_searches_v1";

export default function SearchBox({
  placeholder = "구장, 팀 이름으로 찾기",
  autoFocus = false,
  onSelect,
  className = "",
}) {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [suggest, setSuggest] = useState({ grounds: [], teams: [] });
  const [recent, setRecent] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const debounced = useDebounce(text, 250);
  const wrapRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    try {
      setRecent(JSON.parse(localStorage.getItem(LS_KEY)) || []);
    } catch {}
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!debounced) {
        setSuggest({ grounds: [], teams: [] });
        return;
      }
      setLoading(true);
      const r = await fetchSuggestions(debounced);
      if (!cancelled) {
        setSuggest(r);
        setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [debounced]);

  useEffect(() => {
    const handler = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const flatItems = useMemo(() => {
    const arr = [];
    if (suggest.grounds.length)
      arr.push({ type: "label", name: "구장" }, ...suggest.grounds);
    if (suggest.teams.length)
      arr.push({ type: "label", name: "팀" }, ...suggest.teams);
    if (!text && recent.length)
      arr.push(
        { type: "label", name: "최근 검색어" },
        ...recent.map((name) => ({ type: "recent", name }))
      );
    return arr;
  }, [suggest, recent, text]);

  const commitRecent = (name) => {
    try {
      const next = [name, ...recent.filter((x) => x !== name)].slice(0, 8);
      setRecent(next);
      localStorage.setItem(LS_KEY, JSON.stringify(next));
    } catch {}
  };

  const handleSelect = (itemOrText) => {
    const value = typeof itemOrText === "string" ? itemOrText : itemOrText.name;
    if (value?.trim()) commitRecent(value.trim());
    onSelect?.(itemOrText);
    setOpen(false);
    setActiveIndex(-1);
  };

  const onKeyDown = (e) => {
    if (!open && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      setOpen(true);
      return;
    }
    if (!flatItems.length) {
      if (e.key === "Enter") handleSelect(text);
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      let i = activeIndex + 1;
      while (i < flatItems.length && flatItems[i].type === "label") i++;
      setActiveIndex(i >= flatItems.length ? -1 : i);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      let i = activeIndex - 1;
      while (i >= 0 && flatItems[i].type === "label") i--;
      setActiveIndex(i < -1 ? -1 : i);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0 && flatItems[activeIndex]?.type !== "label")
        handleSelect(flatItems[activeIndex]);
      else handleSelect(text);
    } else if (e.key === "Escape") {
      setOpen(false);
      inputRef.current?.blur();
    }
  };

  return (
    <div ref={wrapRef} className={`sb ${text ? "has-value" : ""} ${className}`}>
      <input
        ref={inputRef}
        type="search"
        value={text}
        placeholder={placeholder}
        onChange={(e) => {
          setText(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKeyDown}
        autoFocus={autoFocus}
        className="sb-input"
        aria-expanded={open}
        aria-activedescendant={
          activeIndex >= 0 ? `sb-opt-${activeIndex}` : undefined
        }
        role="combobox"
      />
      <button
        type="button"
        className="sb-clear"
        aria-label="입력 지우기"
        onClick={() => {
          setText("");
          inputRef.current?.focus();
        }}
      >
        <img src={Multiply} alt="" />
      </button>

      {open && (
        <div className="sb-panel">
          {loading && <div className="sb-hint">검색 중…</div>}
          {!loading && flatItems.length === 0 && (
            <div className="sb-hint">검색어를 입력해 주세요</div>
          )}
          {!loading &&
            flatItems.map((item, i) =>
              item.type === "label" ? (
                <div key={`label-${i}`} className="sb-label">
                  {item.name}
                </div>
              ) : (
                <button
                  type="button"
                  id={`sb-opt-${i}`}
                  key={item.name + i}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => handleSelect(item)}
                  className={`sb-item ${i === activeIndex ? "is-active" : ""}`}
                >
                  <span className="sb-item-text">{item.name}</span>
                </button>
              )
            )}
        </div>
      )}
    </div>
  );
}
