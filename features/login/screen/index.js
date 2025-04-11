import React from "react";
import FormLogin from "../components/FormLogin";
import styles from '@/features/login/styles/Login.module.css'
import config from "@/config";
import { useRouter } from "next/router";

const LoginPageScreen = (props) => {
  const { error, username, user } = props
  const { locale, pathname, replace, query, push } = useRouter();

  return (
    <div className={styles.form_container}>
      <FormLogin
        initUsername={user?.username}
        actionURL={`${config.basePath}/api/login`}
        error={error}
        push={push}
      />
    </div>
  );
};

export default React.memo(LoginPageScreen);
