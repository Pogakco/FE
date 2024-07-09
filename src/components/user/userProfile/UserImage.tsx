import CircleButton from "@/components/buttons/CircleButton";
import Profile from "@/components/profile/Profile";
import { useRef, useState } from "react";
import { BiPlus } from "react-icons/bi";
import styled from "styled-components";

interface Props {
  url: string | null;
}
const UserImage = ({ url }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(url); // 이미지의 base64 데이터

  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // 선택된 파일
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file); // 파일을 base64로 읽음

      reader.onload = () => {
        setImageSrc(reader.result as string | null); // 이미지 데이터 설정
      };
    }
  };

  return (
    <UserImageStyle>
      <Profile size="large" url={imageSrc || ""} />
      {/* input을 대체할 버튼 */}
      <CircleButton
        buttonSize="small"
        onClick={() => inputRef.current?.click()}
      >
        <BiPlus />
      </CircleButton>
      <input
        accept="image/*"
        multiple={false}
        type="file"
        ref={inputRef}
        onChange={onUpload}
        style={{ display: "none" }}
      />
    </UserImageStyle>
  );
};

const UserImageStyle = styled.div`
  position: relative;
  display: inline-block;

  button {
    position: absolute;
    top: 195px;
    right: 10px;
    cursor: pointer;
  }
`;
export default UserImage;
