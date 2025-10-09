"use client";

import {
  useOryFlow,
  OryNodeSsoButtonProps,
  OryNodeButtonProps,
} from "@ory/elements-react";
import { PropsWithChildren } from "react";
import React from "react";

export function LoginCardRoot({ children }: PropsWithChildren) {
  return (
    <div className="text-black min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
            <p className="">Sign in to your account to continue</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

export function LoginCardHeader() {
  return <div>Header</div>;
}

export function LoginCardFooter() {
  return <div>Footer</div>;
}

export function LoginCardContent({ children }: PropsWithChildren) {
  return children;
}

export function LoginFormGroup({ children }: PropsWithChildren) {
  return children;
}

export function LoginFormSsoButton({ node }: OryNodeSsoButtonProps) {
  const { flow } = useOryFlow();
  console.log("flow", flow);

  const onRedirect = (url: string) => {
    window.location.assign(url);
  };

  const action = async () => {
    const csrfToken = flow.ui?.nodes.find(
      (n) => n.attributes.name === "csrf_token",
    )?.attributes.value;

    const response = await fetch(flow.ui.action, {
      method: "POST",
      body: JSON.stringify({
        csrf_token: csrfToken,
        method: "oidc",
        provider: "google",
      }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // 👈 THIS IS CRUCIAL
    });
    const oauth2Success = await response.json();

    const redirectBrowserTo =
      oauth2Success.redirect_browser_to &&
      typeof oauth2Success.redirect_browser_to === "string";

    if (redirectBrowserTo) {
      onRedirect(oauth2Success.redirect_browser_to as string);
    }
  };

  return (
    <button
      type="button"
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={action}
    >
      {node?.meta?.label?.text}
    </button>
  );
}

export function LoginFormButton({ node }: OryNodeButtonProps) {
  return (
    <button
      type="button"
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      {node?.meta?.label?.text}
    </button>
  );
}
