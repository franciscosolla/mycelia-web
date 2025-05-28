"use client";

import { ExploreOption } from "./ExploreOption";
import { ImportOption } from "./ImportOption";

export const Connect = () => {
  return (
    <section className="flex flex-row flex-wrap gap-2 p-2 justify-end">
      <ExploreOption />
      <ImportOption />
    </section>
  );
};
