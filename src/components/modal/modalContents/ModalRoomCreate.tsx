import { useForm, SubmitHandler } from "react-hook-form";
import SquareButton from "@/components/buttons/SquareButton";
import { ModalHeader, ModalRoomCreateStyle } from "../ModalStyle";
import { IcreateRoomForm } from "@/models/room.model";
import { createRoom } from "@/api/roomList.api";
import { ROOM_CREATE_INFO_FIELD, ROOM_CREATE_TIMER_FIELD } from "@/constants/inputField";
import InputField from "@/components/inputField/InputField";
import { deleteSession, getFromSession, saveToSession } from "@/utils/session";
import { useNavigate } from "react-router-dom";

const ModalRoomCreate = () => {
  const navigate = useNavigate();
  const initialValues = {
    ...ROOM_CREATE_INFO_FIELD.reduce((acc, item) => {
      acc[item.field as keyof IcreateRoomForm] = getFromSession(item.field as keyof IcreateRoomForm) || '';
      return acc;
    }, {} as IcreateRoomForm),
    ...ROOM_CREATE_TIMER_FIELD.reduce((acc, item) => {
      acc[item.field as keyof IcreateRoomForm] = getFromSession(item.field as keyof IcreateRoomForm) || '';
      return acc;
    }, {} as IcreateRoomForm)
  };

  const { register, handleSubmit, formState: { errors } } = useForm<IcreateRoomForm>({
    defaultValues: initialValues
  });

  const handleInputBlur = (field: keyof IcreateRoomForm, value: string) => {
    saveToSession(field, value);
  };

  const onSubmit: SubmitHandler<IcreateRoomForm> = (data) => {
    createRoom(data).then((response) => {
      deleteSession("deleteCreateRoomSession");
      navigate(`rooms/${response.roomId}`);
    }).catch((error) => {
      throw error;
    });
  };

  return (
    <ModalRoomCreateStyle>
      <ModalHeader>
        <h1>방 생성하기</h1>
        <hr />
      </ModalHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="title">방 정보</div>
        {ROOM_CREATE_INFO_FIELD.map((item, index) => (
          <div key={index}>
            <InputField
              inputfield={item}
              schema="auth"
              defaultValue={initialValues[item.field as keyof IcreateRoomForm]}
              {...register(item.field as keyof IcreateRoomForm, {
                required: {
                  value: true,
                  message: "항목이 비어있습니다."
                },
                pattern: {
                  value: item.regex,
                  message: item.message
                }
              })}
              onBlur={(e) => handleInputBlur(item.field as keyof IcreateRoomForm, e.target.value)}
            />
            {errors[item.field as keyof IcreateRoomForm] && (
              <div className="help-message">{errors[item.field as keyof IcreateRoomForm]?.message}</div>
            )}
          </div>
        ))}
        <div className="title">타이머 정보</div>
        {ROOM_CREATE_TIMER_FIELD.map((item, index) => (
          <div key={index}>
            <InputField
              inputfield={item}
              schema="auth"
              defaultValue={initialValues[item.field as keyof IcreateRoomForm]}
              {...register(item.field as keyof IcreateRoomForm, {
                required: {
                  value: true,
                  message: "항목이 비어있습니다."
                },
                pattern: {
                  value: item.regex,
                  message: item.message
                }
              })}
              onBlur={(e) => handleInputBlur(item.field as keyof IcreateRoomForm, e.target.value)}
            />
            {errors[item.field as keyof IcreateRoomForm] && (
              <div className="help-message">{errors[item.field as keyof IcreateRoomForm]?.message}</div>
            )}
          </div>
        ))}
        <div className="buttonContainer">
          <SquareButton buttonColor="active" buttonSize="medium" type="submit">
            생성하기
          </SquareButton>
        </div>
      </form>
    </ModalRoomCreateStyle>
  );
};

export default ModalRoomCreate;
