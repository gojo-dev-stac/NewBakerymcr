import type { Metadata } from "next";
import Animations from "@/components/engine/Animations";
import Cursor from "@/components/engine/Cursor";
import RecordMode from "@/components/engine/RecordMode";
import SmoothScroll from "@/components/engine/SmoothScroll";
import { meta } from "@/site/site";
import ClassicHeader from "@/site/components/ClassicHeader";
import HoldPush from "@/site/components/HoldPush";
import LayersLoader from "@/site/components/LayersLoader";
import ShopCollection from "@/site/components/ShopCollection";
import SiteFlags from "@/site/components/SiteFlags";
import VisitFooter from "@/site/components/VisitFooter";

export const metadata: Metadata = {
  title: `Bespoke cakes | ${meta.name}`,
  description: "Browse the current bespoke cake collection from thebakerymcr in Manchester.",
};

export default function BespokeCakePage() {
  return (
    <>
      <SiteFlags />
      <LayersLoader />
      <SmoothScroll />
      <Animations />
      <HoldPush />
      <RecordMode speed={meta.record?.speed} duration={meta.record?.duration} delay={meta.record?.delay} />
      <Cursor />
      <ClassicHeader />
      <ShopCollection collection="bespoke-cake" />
      <VisitFooter />
    </>
  );
}
