"use client";

import { api } from "~/trpc/react";
import type { ItemProps } from "./item-panel";

export function ItemConsumptionPanel(props: ItemProps) {
  const { item, unit, verb } = props;
  const consumptionQuery = api.item.getYtd.useQuery(
    { item },
    {
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  );
  return (
    <p className="text-2xl text-white">
      You have {verb ?? "used"}{" "}
      {consumptionQuery.data ? `${consumptionQuery.data}${unit}` : "quite some"}{" "}
      {item} so far this year.
    </p>
  );
}