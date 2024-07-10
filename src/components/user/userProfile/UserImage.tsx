import CircleButton from "@/components/buttons/CircleButton";
import Profile from "@/components/profile/Profile";
import { useRef, useState } from "react";
import { BiPlus } from "react-icons/bi";
import styled from "styled-components";

interface Props {
  url: string | null;
  setUrl: React.Dispatch<React.SetStateAction<string | null>>;
}

const allowedExtensions = [
  "jpg",
  "jpeg",
  "png",
  "gif",
  "bmp",
  "webp",
  "tif",
  "tiff"
];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const UserImage = ({ url, setUrl }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // 선택된 파일

    if (file) {
      const fileExtension = file.name.split(".").pop()?.toLowerCase();

      if (!allowedExtensions.includes(fileExtension || "")) {
        setFileError("허용되지 않는 파일 형식입니다.");
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        setFileError("파일 크기는 5MB를 초과할 수 없습니다.");
        return;
      }

      const objectUrl = URL.createObjectURL(file);
      setUrl(objectUrl);
      setFileError(null);
    }
  };

  return (
    <UserImageStyle>
      <Profile size="large" url={url || ""} />
      {/* input을 대체할 버튼 */}
      <CircleButton
        buttonSize="small"
        onClick={() => inputRef.current?.click()}
      >
        <BiPlus />
      </CircleButton>
      {fileError && <div className="help-message">{fileError}</div>}
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
