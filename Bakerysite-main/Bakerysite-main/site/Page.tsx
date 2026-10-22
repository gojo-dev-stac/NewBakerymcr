import LayersLoader from "./components/LayersLoader";
import SiteFlags from "./components/SiteFlags";
import HoldPush from "./components/HoldPush";
import ClassicHeader from "./components/ClassicHeader";
import BuildHero from "./components/BuildHero";
import TheCrown from "./components/TheCrown";
import CakeCounter from "./components/CakeCounter";
import InsideSlice from "./components/InsideSlice";
import BuildYourOwn from "./components/BuildYourOwn";
import BoxedFilm from "./components/BoxedFilm";
import Bespoke from "./components/Bespoke";
import JustOrdered from "./components/JustOrdered";
import VisitFooter from "./components/VisitFooter";
import SiteMotion from "./components/SiteMotion";
import BakeryDetails from "./components/BakeryDetails";

/** thebakerymcr: cakes, brownies and desserts in Manchester. */
export default function Page() {
  return (
    <>
      {/* never restore the old scroll position on reload · cover the page as it unloads so a reload never flashes
          the old page · ?record=1: hide the mouse arrow from the first frame */}
      <script
        dangerouslySetInnerHTML={{
          __html: `history.scrollRestoration="manual";addEventListener("pagehide",function(){var c=document.createElement("div");c.style.cssText="position:fixed;inset:0;z-index:2147483647;background:#fff8fb";document.body.appendChild(c)});addEventListener("pageshow",function(e){if(e.persisted)location.reload()});if(/[?&]record/.test(location.search)){var s=document.createElement("style");s.textContent="*,*::before,*::after{cursor:none!important}html{scrollbar-width:none}html::-webkit-scrollbar{display:none}";document.head.appendChild(s)}`,
        }}
      />
      <SiteFlags />
      <LayersLoader />
      <HoldPush />
      <SiteMotion />
      <BakeryDetails />
      <ClassicHeader />
      <main className="home-page relative overflow-x-clip">
        <BuildHero />
        <TheCrown />
        <CakeCounter />
        <InsideSlice />
        <BuildYourOwn />
        <BoxedFilm />
        <JustOrdered />
        <Bespoke />
      </main>
      <VisitFooter />
    </>
  );
}
