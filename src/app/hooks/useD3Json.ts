import { useEffect, useState } from "react";
import { json } from "d3";

export const useGeoJsonData = <T = string>(url: string) => {
  const [data, setData] = useState<T | undefined>();

  useEffect(() => {
    json<T>(url).then((json) => setData(json));
  }, [url]);

  return data;
};
