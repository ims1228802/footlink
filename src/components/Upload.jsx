import React from "react";
import { useState } from "react";

export default function Upload({ onClose, team, setTeam, selectImgUrl, setSelectImgUrl, selectFile, setSelectFile }){
    const [ url, setUrl ] = useState(null);
    const [ tempFile, setTempFile ] = useState(null);

    const onChangeHandler = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        setTempFile(file);

        reader.onload = (e) => {
            setUrl(e.target.result);
        };
        reader.readAsDataURL(file);
    }

    const onClickHandler = () => {
        setSelectImgUrl(url);
        setSelectFile(tempFile);
        console.log(selectFile);
        onClose();
    }

    return(
        <div>
            <h2>엠블렘 사진 업로드</h2>
            <input type="file" accept="image/*" onChange={onChangeHandler}/>
            <div className="preview">
                {url && <img src={url} alt="미리보기"/>}
                {!url && <p>선택한 이미지가 표시됩니다.</p>}

            </div>
            <div className="button-div">
                <button type="button" onClick={onClose} className="outline-btn">닫기</button>
                <button type="button" onClick={onClickHandler} className="fill-btn">확인</button>
            </div>
        </div>
    )
}