import { BsPersonCircle } from "react-icons/bs";
import { BsShieldShaded } from "react-icons/bs";
import { BsLightning } from "react-icons/bs";
import { BsFillMegaphoneFill } from "react-icons/bs";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { BsBell } from "react-icons/bs";
import { BsBoxArrowRight } from "react-icons/bs";
import { BsGear } from "react-icons/bs";

export const SidebarItem = [
  {
    category: "MY 정보관리",
    items: [
      { image: <BsPersonCircle />, title: "내정보", contents: "콘텐츠" },
      { image: <BsShieldShaded />, title: "소속한팀", contents: "콘텐츠" },
      { image: <BsLightning />, title: "매치정보", contents: "콘텐츠" }
    ]
  },
  {
    category: "고객센터",
    items: [
      { image: <BsFillMegaphoneFill />, title: "공지사항", contents: "콘텐츠" },
      {
        image: <BsFillQuestionCircleFill />,
        title: "자주묻는질문",
        contents: "콘텐츠",
      }
    ]
  },
  {
    category: "기타",
    items: [
      { image: <BsGear />, title: "설정", contents: "콘텐츠" },
      { image: <BsBell />, title: "알림", contents: "콘텐츠" },
      { image: <BsBoxArrowRight />, title: "로그아웃" }
    ]
  }
];

export default function Sidebar({category,items}) {
  return (
    <li>
        <h3>{category}</h3>
        <img src={items.image} alt={items.title} />
        <p>{items.title}</p>
        <p>{items.contents}</p>
    </li>
  )

}
