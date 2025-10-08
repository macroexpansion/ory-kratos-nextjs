// Copyright © 2024 Ory Corp

import { Login } from "@ory/elements-react/theme";
import { getLoginFlow, OryPageParams } from "@ory/nextjs/app";

import config from "@/ory.config";
import {
  LoginCardRoot,
  LoginCardHeader,
  LoginCardFooter,
  LoginCardContent,
  LoginFormGroup,
  LoginFormSsoButton,
  LoginFormButton,
} from "@/components/LoginCard";

export default async function LoginPage(props: OryPageParams) {
  const flow = await getLoginFlow(config, props.searchParams);

  if (!flow) {
    return null;
  }

  return (
    <Login
      flow={flow}
      config={config}
      components={{
        Card: {
          Root: LoginCardRoot,
          Header: LoginCardHeader,
          Footer: LoginCardFooter,
          Content: LoginCardContent,
        },
        Form: {
          Group: LoginFormGroup,
        },
        Node: {
          SsoButton: LoginFormSsoButton,
          Button: LoginFormButton,
        },
      }}
    />
  );
}
