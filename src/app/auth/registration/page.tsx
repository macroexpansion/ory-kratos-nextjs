// Copyright © 2024 Ory Corp

import { Registration } from "@ory/elements-react/theme";
import { getRegistrationFlow, OryPageParams } from "@ory/nextjs/app";

import config from "@/ory.config";

export default async function RegistrationPage(props: OryPageParams) {
  const flow = await getRegistrationFlow(config, props.searchParams);

  if (!flow) {
    return null;
  }

  return (
    <Registration
      flow={flow}
      config={config}
      components={{
        Card: {},
      }}
    />
  );
}
