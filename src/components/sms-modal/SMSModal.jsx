import {MdClose} from "react-icons/md";
import {useEffect, useState} from "react";

const SMSModal = (props) => {
  const {setShowModal, otp : otp2} = props

  const [timer, setTimer] = useState(59);
  const [start, setStart] = useState(false);
  const [otp, setOtp] = useState({
    value1: "",
    value2: "",
    value3: "",
    value4: "",
  });
  useEffect(() => {
    const countdown = setInterval(() => {

      setTimer(prevTimer => {
        if (prevTimer <= 1) {
          clearInterval(countdown);
          return 0;
        }
        if (prevTimer === 55) {
          // const randomCode = Math.floor(1000 + Math.random() * 9000);
          // alert(otp2)
          console.log(otp2)
        }
        return prevTimer - 1;
      });
    }, 1000);
    console.log(timer, '------')

    return () => clearInterval(countdown);
  }, [start]);

  useEffect(() => {
    if(otp2.length > 0){
      const otpKode  = otp2?.split(''); // "2345" -> [2,3,4,5]
      setOtp({
        value1: otpKode[0],
        value2: otpKode[1],
        value3: otpKode[2],
        value4: otpKode[3]
      })
    }
  }, [otp2])

  const onChange = (e) => {
    const {name, value} = e.target;

    setOtp((prevState) => {
      return {
        ...prevState,
        [name]: value,
      }
    })
  }

  return (
      <div
          className={"fixed flex w-full h-[100vh] inset-0 backdrop-blur-sm bg-[#19191966] items-center justify-center"}>
        <div className={"text-center w-[850px] rounded-[24px] relative bg-white py-[40px] px-[20px] shadow-md"}>
          <button className={"absolute -right-[35px] top-[12px] text-[32px] text-gray-400"}>
            <MdClose/>
          </button>
          <h2 className={"text-[24px] font-semibold mb-[17px]"}>Код из SMS</h2>
          <p className={"text-[#A5A5A5] mb-[20px]"}>На номер +7 (XXX) XXX-XX-XX</p>
          <div className={"w-[240px] mx-auto"}>
            <div className={"flex justify-center gap-[10px] mb-[20px]"}>
              <input
                  type="text"
                  name="value1"
                  value={otp.value1}
                  onChange={onChange}
                  maxLength={1}
                  className={"w-[50px] h-[50px] text-center text-[24px] border border-[#F0F0F0] rounded-[8px] focus:outline-0 focus:border-[#FF7010]"}
              />
              <input
                  type="text"
                  name="value2"
                  value={otp.value2}
                  onChange={onChange}
                  maxLength={1}
                  className={"w-[50px] h-[50px] text-center text-[24px] border border-[#F0F0F0] rounded-[8px] focus:outline-0 focus:border-[#FF7010]"}
              />
              <input
                  type="text"
                  name="value3"
                  value={otp.value3}
                  onChange={onChange}
                  maxLength={1}
                  className={"w-[50px] h-[50px] text-center text-[24px] border border-[#F0F0F0] rounded-[8px] focus:outline-0 focus:border-[#FF7010]"}
              />
              <input
                  type="text"
                  name="value4"
                  value={otp.value4}
                  onChange={onChange}
                  maxLength={1}
                  className={"w-[50px] h-[50px] text-center text-[24px] border border-[#F0F0F0] rounded-[8px] focus:outline-0 focus:border-[#FF7010]"}
              />
            </div>
            <button
                onClick={() => {
                  // if
                  setShowModal("")
                }}
                className={"w-full py-[13px] bg-[#FF7010] text-white text-[17px] font-semibold rounded-[16px] mb-[12px]"}>Войти
            </button>
          </div>
          <p
              onClick={() => {
                setStart(true)
                setTimer(59)
              }}
              className={"text-center cursor-pointer text-[#A5A5A5] text-[14px]"}>
            Отправить код ещё раз через :{timer.toString().padStart(2, "0")} секунд</p>
        </div>
      </div>
  );
};

export default SMSModal;