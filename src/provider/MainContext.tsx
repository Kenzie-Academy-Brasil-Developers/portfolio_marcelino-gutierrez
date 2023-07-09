import { useRef, useState } from "react";
import { createContext } from "react";
import { TContactFormValues } from "../schema/ContactFormSchema";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import { IMainContext, IMainContextProps } from "../interface";

export const MainContext = createContext({} as IMainContext);

export const ContextProvider = ({ children }: IMainContextProps) => {
  const NavbarDrawerRef = useRef<HTMLInputElement>(null);
  const NavbarElementRef = useRef<HTMLDivElement>(null);

  const toggleDrawer = () => {
    if (NavbarDrawerRef.current !== null)
      NavbarDrawerRef.current.checked = !NavbarDrawerRef.current.checked;
  };

  const sendEmail = async (formData: TContactFormValues) => {
    try {
      emailjs.init("sAZB8VbdMaitSOQM-");
      const params = {
        from_name: formData.name,
        email_id: formData.email,
        message: formData.message,
      };
      const res = await emailjs.send(
        "service_917op3r",
        "template_o80cp16",
        params
      );
      if (res.status === 200) {
        toast.success("Email sent successfully.");
      } else {
        toast.error("There was an error. Try again.");
      }
    } catch (error: any) {
      toast.error("There was an error. Try again.");
    }
  };

  const [translation, setTranslation] = useState<boolean>(true);

  return (
    <>
      <MainContext.Provider
        value={{
          sendEmail,
          NavbarDrawerRef,
          NavbarElementRef,
          toggleDrawer,
          translation,
          setTranslation,
        }}
      >
        {children}
      </MainContext.Provider>
    </>
  );
};
