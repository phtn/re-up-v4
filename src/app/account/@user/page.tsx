import tw from "tailwind-styled-components";

export default async function UserPage() {
  return (
    <Base>
      <Container>
        <Grid>
          <SidePanel />
          <Primary>
            <DevAccount />
          </Primary>
          <Secondary>
            <TeamAccount />
          </Secondary>
        </Grid>
      </Container>
    </Base>
  );
}

const DevAccount = () => {
  return (
    <DevContainer>
      <DevSurface>
        <DevLayer>
          <FlexWide>
            <Header>
              <DarkLogo />
              <div className="font-jet">
                <DevTitle>Developer</DevTitle>

                <p className="text-sm leading-[16px] tracking-wide text-cyan-600">
                  Account
                </p>
              </div>
            </Header>
            <div>
              <div className="font-jet text-4xl font-thin text-void/80">$0</div>
              <div className="text-sm text-slate-600"></div>
            </div>
          </FlexWide>
        </DevLayer>
      </DevSurface>
    </DevContainer>
  );
};

const TeamAccount = () => {
  return (
    <TeamContainer>
      <TeamSurface>
        <Dots>
          <FlexWide>
            <Header className="bg-[url('/svg/pers_v2.svg')] bg-cover bg-right-bottom">
              <LightLogo />
              <div className="font-jet">
                <TeamTitle>Team</TeamTitle>
                <p className="text-sm leading-[16px] tracking-wide text-cyan-600">
                  Account
                </p>
              </div>
            </Header>
            <div>
              <div className="font-jet text-4xl font-thin text-slate-200">
                $7
              </div>
              <div className="text-sm text-cyan-700"></div>
            </div>
          </FlexWide>
          <TeamLayer>
            <div className="h-[900px] text-cord"></div>
          </TeamLayer>
        </Dots>
      </TeamSurface>
    </TeamContainer>
  );
};

const SidePanel = () => {
  return (
    <Panel>
      <div className="flex w-full items-center">
        <div className="rounded-md bg-slate-900/20 p-2">
          <div className="via-slate-100 font-thin flex w-fit bg-gradient-to-tr from-orange-100 to-teal-100 bg-clip-text font-jet text-sm text-transparent">
            re-up.ph
          </div>
        </div>
      </div>
    </Panel>
  );
};

const Base = tw.div`
  bg-void/80 rounded-[12px] overflow-clip
  border-[0.33px] border-ash/10
  shadow-xl shadow-stone-400 h-fit xl:h-[714px] w-full
  `;
const Dots = tw.div`
  bg-[url('/svg/dots.svg')] bg-contain bg-right-top bg-no-repeat w-full h-full

  `;
const Container = tw.div`
  bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))]
  from-indigo-300/50 via-slate-300 to-orange-50 h-[714px] w-full
  `;

const Grid = tw.div`
  grid grid-cols-1 md:grid-cols-5
  `;

// const Cover = tw.div`
//    bg-[url('/svg/pers_v2.svg')] bg-cover col-span-2 h-[714px]
//   `;
const Panel = tw.div`
  col-span-1 h-fit xl:h-[714px] w-full border-r-[0.33px] border-opus/30
  p-4 bg-[url('/svg/pers.svg')] bg-cover overflow-visible
  `;
const Primary = tw.div`
  col-span-1 md:col-span-2 h-fit xl:h-[714px] w-full
  flex w-full items-end justify-center
  `;
const Secondary = tw.div`
  col-span-1 md:col-span-2 h-fit xl:h-[714px] w-full
  flex w-full items-end justify-center
  `;
const DevContainer = tw.div`
  h-[640px] w-full p-10
  `;
const DevSurface = tw.div`
  bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))]
  from-cyan-50/80 via-gray-50 to-orange-50
  w-full h-full rounded-[12px] border-[0.33px] border-opus shadow-md shadow-dyan/50
  hover:scale-[101%] transition-transform duration-700 ease-in-out
  `;
const DevTitle = tw.div`
  text-xl leading-[1.80rem] text-void/80
  `;
const DevLayer = tw.div`
  bg-[url('/svg/pers_v3.svg')] bg-cover
  `;
const Header = tw.div`
  flex md:h-[120px] xl:h-[150px] w-full items-center space-x-6
  `;
const DarkLogo = tw.div`
  size-[36px] bg-[url('/svg/logo_dark.svg')] bg-contain bg-no-repeat
  `;
const LightLogo = tw.div`
  size-[36px] bg-[url('/svg/logo_light.svg')] bg-contain bg-no-repeat
  `;
const TeamTitle = tw.div`
  text-xl leading-[1.80rem]
  text-transparent bg-clip-text bg-gradient-to-r
  from-gray-300 via-stone-100 to-orange-50
  `;
const TeamContainer = tw.div`
  h-[695px] w-full p-10
  `;
const TeamSurface = tw.div`
  w-full h-full rounded-[12px] shadow-md shadow-indigo-950/50
  bg-void/80 overflow-hidden
  hover:scale-[101%] transition-transform duration-700 ease-in-out
  `;
const TeamLayer = tw.div`

  `;
const FlexWide = tw.div`
  flex items-center justify-between h-fit w-full
  border-b border-slate-400/30
  xl:px-8 lg:px-6 md:px-4 overflow-hidden
  `;
