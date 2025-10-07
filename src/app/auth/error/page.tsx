// Copyright © 2024 Ory Corp

import { Error } from "@ory/elements-react/theme";
import { OryPageParams } from "@ory/nextjs/app";
import { FrontendApi, Configuration } from "@ory/client-fetch";

import config from "@/ory.config";

export default async function ErrorPage(props: OryPageParams) {
  const searchParams = await props.searchParams;
  const errorId = searchParams.id;

  if (!errorId || typeof errorId !== "string") {
    return null;
  }

  const kratosClient = new FrontendApi(
    new Configuration({
      basePath: config?.sdk?.url,
    }),
  );

  try {
    const flowError = await kratosClient.getFlowError({ id: errorId });

    return (
      <Error
        error={flowError}
        config={config}
        components={{
          Card: {},
        }}
      />
    );
  } catch (error) {
    console.error("Error fetching flow error:", error);
    return null;
  }
}
