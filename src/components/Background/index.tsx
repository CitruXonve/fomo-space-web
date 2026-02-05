import UpperBackgroundImage from "@/assets/photo_2026-02-04 22.10.52.jpeg";
import LowerBackgroundImage from "@/assets/star-trail-photography.jpg";

const UpperBackgroundMask = (
  <mask id="upperBackgroundMask">
    <g fill="none" stroke="white" filter="url(#strongGlow)">
      <circle
        cx="-20"
        cy="120"
        r="100"
        fill="white"
        filter="url(#strongGlow)"
      />
      <circle
        r="100"
        strokeWidth="60"
        filter="url(#strongGlow)"
        style={{
          transform: "translateX(50vw) translateY(calc(25% + 15px))",
        }}
      />
      <path
        d="M0,200 L200,100 L0,0"
        fill="none"
        stroke="white"
        strokeWidth="30"
        strokeLinejoin="round"
        strokeLinecap="round"
        style={{
          transform:
            "translateX(calc(50vw - 300px)) translateY(calc(25% - 85px))",
        }}
      />
      <path
        d="M200,200 L0,100 L200,0"
        fill="none"
        stroke="white"
        strokeWidth="30"
        filter="url(#strongGlow)"
        strokeLinejoin="round"
        strokeLinecap="round"
        style={{
          transform:
            "translateX(calc(50vw + 100px)) translateY(calc(25% - 85px))",
        }}
      />
    </g>
    <g
      filter="url(#glow)"
      stroke="white"
      strokeWidth="10"
      strokeLinejoin="round"
      strokeLinecap="round"
      style={{
        display: "grid",
        opacity: 0.5,
        gridTemplateColumns: "repeat(12, 1fr)",
        gridTemplateRows: "repeat(12, 1fr)",
        gridGap: "10px",
      }}
    >
      <line x1="100" y1="80" x2="140" y2="100" />
      <g id="line-group-1-1">
        <line x1="100" y1="80" x2="140" y2="100" transform="translate(100 0)" />
        <line
          x1="100"
          y1="80"
          x2="140"
          y2="100"
          transform="translate(145 -2)"
        />
        <line
          x1="100"
          y1="80"
          x2="140"
          y2="100"
          transform="translate(160 26)"
        />
        <line x1="180" y1="90" x2="280" y2="140" />
        <line
          x1="180"
          y1="90"
          x2="280"
          y2="140"
          transform="translate(120 15)"
        />
      </g>
      <g id="line-group-1-2" transform="translate(134 -6)">
        <line x1="100" y1="80" x2="140" y2="100" transform="translate(100 0)" />
        <line
          x1="100"
          y1="80"
          x2="140"
          y2="100"
          transform="translate(145 -2)"
        />
        <line
          x1="100"
          y1="80"
          x2="140"
          y2="100"
          transform="translate(160 26)"
        />
        <line x1="180" y1="90" x2="280" y2="140" />
        <line
          x1="180"
          y1="90"
          x2="280"
          y2="140"
          transform="translate(120 15)"
        />
      </g>
      <g
        id="line-group-1-3"
        transform="translate(278 -6)"
        filter="url(#strongGlow)"
      >
        <line x1="100" y1="80" x2="140" y2="100" transform="translate(100 0)" />
        <line
          x1="100"
          y1="80"
          x2="140"
          y2="100"
          transform="translate(145 -2)"
        />
        <line
          x1="100"
          y1="80"
          x2="140"
          y2="100"
          transform="translate(160 26)"
        />
        <line x1="180" y1="90" x2="280" y2="140" />
        <line
          x1="180"
          y1="90"
          x2="280"
          y2="140"
          transform="translate(120 15)"
        />
      </g>
      <g
        id="line-group-1-4"
        transform="translate(422 -6)"
        filter="url(#strongGlow)"
      >
        <line x1="100" y1="80" x2="140" y2="100" transform="translate(100 0)" />
        <line
          x1="100"
          y1="80"
          x2="140"
          y2="100"
          transform="translate(145 -2)"
        />
        <line
          x1="100"
          y1="80"
          x2="140"
          y2="100"
          transform="translate(160 26)"
        />
        <line x1="180" y1="90" x2="280" y2="140" />
        <line
          x1="180"
          y1="90"
          x2="280"
          y2="140"
          transform="translate(120 15)"
        />
      </g>
      <g
        id="line-group-1-5"
        transform="translate(422 -6)"
        filter="url(#strongGlow)"
      >
        <line x1="100" y1="80" x2="140" y2="100" transform="translate(100 0)" />
        <line
          x1="100"
          y1="80"
          x2="140"
          y2="100"
          transform="translate(145 -2)"
        />
        <line
          x1="100"
          y1="80"
          x2="140"
          y2="100"
          transform="translate(160 26)"
        />
        <line x1="180" y1="90" x2="280" y2="140" />
        <line
          x1="180"
          y1="90"
          x2="280"
          y2="140"
          transform="translate(120 15)"
        />
      </g>
      <g
        id="line-group-1-6"
        transform="translate(542 -36)"
        filter="url(#strongGlow)"
      >
        <line x1="100" y1="80" x2="140" y2="100" transform="translate(100 0)" />
        <line
          x1="100"
          y1="80"
          x2="140"
          y2="100"
          transform="translate(145 -2)"
        />
        <line
          x1="100"
          y1="80"
          x2="140"
          y2="100"
          transform="translate(160 26)"
        />
        <line x1="180" y1="90" x2="280" y2="140" />
        <line
          x1="180"
          y1="90"
          x2="280"
          y2="140"
          transform="translate(120 15)"
        />
      </g>
      <g
        id="line-group-1-7"
        transform="translate(542 36)"
        filter="url(#strongGlow)"
      >
        <line x1="100" y1="80" x2="140" y2="100" transform="translate(100 0)" />
        <line
          x1="100"
          y1="80"
          x2="140"
          y2="100"
          transform="translate(145 -2)"
        />
        <line
          x1="100"
          y1="80"
          x2="140"
          y2="100"
          transform="translate(160 26)"
        />
        <line x1="180" y1="90" x2="280" y2="140" />
        <line
          x1="180"
          y1="90"
          x2="280"
          y2="140"
          transform="translate(120 15)"
        />
      </g>
    </g>
    <g
      filter="url(#glow)"
      stroke="white"
      strokeWidth="10"
      transform="translate(-40 56)"
      strokeLinejoin="round"
      strokeLinecap="round"
      style={{
        opacity: 0.5,
      }}
    >
      <line x1="100" y1="80" x2="140" y2="100" />
      <g id="line-group-2-1">
        <line
          x1="100"
          y1="80"
          x2="140"
          y2="100"
          transform="translate(80 -20)"
        />
        <line
          x1="100"
          y1="80"
          x2="140"
          y2="100"
          transform="translate(145 -2)"
        />
        <line
          x1="100"
          y1="80"
          x2="140"
          y2="100"
          transform="translate(160 26)"
        />
        <line x1="180" y1="90" x2="280" y2="140" />
        <line
          x1="180"
          y1="90"
          x2="280"
          y2="140"
          transform="translate(120 15)"
        />
      </g>
      <g id="line-group-2-2" transform="translate(134 -6)">
        <line x1="100" y1="80" x2="140" y2="100" transform="translate(100 0)" />
        <line
          x1="100"
          y1="80"
          x2="140"
          y2="100"
          transform="translate(145 -2)"
        />
        <line
          x1="100"
          y1="80"
          x2="140"
          y2="100"
          transform="translate(160 26)"
        />
        <line x1="180" y1="90" x2="280" y2="140" />
        <line
          x1="180"
          y1="90"
          x2="280"
          y2="140"
          transform="translate(120 15)"
        />
      </g>
      <g id="line-group-2-3" transform="translate(278 -6)">
        <line x1="100" y1="80" x2="140" y2="100" transform="translate(100 0)" />
        <line
          x1="100"
          y1="80"
          x2="140"
          y2="100"
          transform="translate(145 -2)"
        />
        <line
          x1="100"
          y1="80"
          x2="140"
          y2="100"
          transform="translate(160 26)"
        />
        <line x1="180" y1="90" x2="280" y2="140" />
        <line
          x1="180"
          y1="90"
          x2="280"
          y2="140"
          transform="translate(120 15)"
        />
      </g>
      <g id="line-group-2-4" transform="translate(422 -6)">
        <line x1="100" y1="80" x2="140" y2="100" transform="translate(100 0)" />
        <line
          x1="100"
          y1="80"
          x2="140"
          y2="100"
          transform="translate(145 -2)"
        />
        <line
          x1="100"
          y1="80"
          x2="140"
          y2="100"
          transform="translate(160 26)"
        />
        <line x1="180" y1="90" x2="280" y2="140" />
        <line
          x1="180"
          y1="90"
          x2="280"
          y2="140"
          transform="translate(120 15)"
        />
      </g>
      <g
        id="line-group-2-5"
        transform="translate(502 82)"
        filter="url(#strongGlow)"
      >
        <line x1="100" y1="80" x2="140" y2="100" transform="translate(100 0)" />
        <line
          x1="100"
          y1="80"
          x2="140"
          y2="100"
          transform="translate(145 -2)"
        />
        <line
          x1="100"
          y1="80"
          x2="140"
          y2="100"
          transform="translate(160 26)"
        />
        <line x1="180" y1="90" x2="280" y2="140" />
        <line
          x1="180"
          y1="90"
          x2="280"
          y2="140"
          transform="translate(120 15)"
        />
      </g>
      <g
        id="line-group-2-6"
        transform="translate(646 82)"
        filter="url(#strongGlow)"
      >
        <line x1="100" y1="80" x2="140" y2="100" transform="translate(100 0)" />
        <line
          x1="100"
          y1="80"
          x2="140"
          y2="100"
          transform="translate(145 -2)"
        />
        <line
          x1="100"
          y1="80"
          x2="140"
          y2="100"
          transform="translate(160 26)"
        />
        <line x1="180" y1="90" x2="280" y2="140" />
        <line
          x1="180"
          y1="90"
          x2="280"
          y2="140"
          transform="translate(120 15)"
        />
      </g>
      <g
        id="line-group-2-7"
        transform="translate(606 162)"
        filter="url(#strongGlow)"
      >
        <line x1="100" y1="80" x2="140" y2="100" transform="translate(100 0)" />
        <line
          x1="100"
          y1="80"
          x2="140"
          y2="100"
          transform="translate(145 -2)"
        />
        <line
          x1="100"
          y1="80"
          x2="140"
          y2="100"
          transform="translate(160 26)"
        />
        <line x1="180" y1="90" x2="280" y2="140" />
        <line
          x1="180"
          y1="90"
          x2="280"
          y2="140"
          transform="translate(120 15)"
        />
      </g>
    </g>
  </mask>
);

const LowerBackgroundMask = (
  <mask id="lowerBackgroundMask">
    {/* Star trails in the bottom 40% of the screen */}
    <g
      fill="none"
      stroke="white"
      filter="url(#strongGlow) blur(5px) opacity(0.25)"
      style={{
        transform: "translateY(-300px)",
      }}
    >
      {/* Horizontal, diagonal star trails */}
      {/* Bottom band is y=600 to y=1000 (bottom 40%) */}
      <line
        x1="100"
        y1="850"
        x2="250"
        y2="870"
        strokeWidth="100"
        opacity="0.35"
        strokeLinecap="round"
      />

      <line
        x1="400"
        y1="820"
        x2="620"
        y2="840"
        strokeWidth="180"
        opacity="0.38"
        strokeLinecap="round"
      />
      <line
        x1="700"
        y1="680"
        x2="770"
        y2="700"
        strokeWidth="120"
        opacity="0.32"
        strokeLinecap="round"
      />
      <line
        x1="900"
        y1="920"
        x2="1030"
        y2="950"
        strokeWidth="200"
        opacity="0.43"
        strokeLinecap="round"
      />
      <line
        x1="1200"
        y1="880"
        x2="1390"
        y2="930"
        strokeWidth="140"
        opacity="0.31"
        strokeLinecap="round"
      />
      <line
        x1="300"
        y1="990"
        x2="540"
        y2="970"
        strokeWidth="150"
        opacity="0.36"
        strokeLinecap="round"
      />
      {/* More subtle, faint/short star trails */}
      <line
        x1="200"
        y1="690"
        x2="260"
        y2="705"
        strokeWidth="90"
        opacity="0.19"
        strokeLinecap="round"
      />
      <line
        x1="1000"
        y1="800"
        x2="1060"
        y2="810"
        strokeWidth="100"
        opacity="0.17"
        strokeLinecap="round"
      />
      <line
        x1="1300"
        y1="965"
        x2="1380"
        y2="985"
        strokeWidth="110"
        opacity="0.2"
        strokeLinecap="round"
      />
      {/* Slight arc trail */}
      <path
        d="M580 925 Q620 940 660 930"
        strokeWidth="120"
        opacity="0.23"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M840 625 Q780 740 750 930"
        strokeWidth="120"
        opacity="0.23"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M380 675 Q240 740 200 930"
        strokeWidth="120"
        opacity="0.23"
        fill="none"
        strokeLinecap="round"
      />
      {/* Angled/diagonal trails */}
      <line
        x1="850"
        y1="615"
        x2="950"
        y2="660"
        strokeWidth="110"
        opacity="0.22"
        strokeLinecap="round"
      />
      <line
        x1="1150"
        y1="705"
        x2="1225"
        y2="780"
        strokeWidth="130"
        opacity="0.35"
        strokeLinecap="round"
      />
    </g>
  </mask>
);

const PrimaryBackground = () => {
  return (
    <div
      className="fixed top-0 left-0 z-0 w-full h-full"
      style={{ backgroundColor: "#0a0e1a" }}
    >
      <svg
        viewBox="0 0 1500 1000"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 left-0 min-w-full min-h-full object-cover pointer-events-none"
      >
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <filter id="strongGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="16" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {UpperBackgroundMask}
          {LowerBackgroundMask}
        </defs>

        {/* Randomly scattered particles */}
        <g opacity="0.6" filter="url(#glow)">
          {/* Small particles */}
          <g>
            <circle cx="8%" cy="45" r="1.5" fill="#ffffff" opacity="0.8" />
            <circle cx="22.67%" cy="120" r="2" fill="#ffffff" opacity="0.6" />
            <circle cx="38.67%" cy="80" r="1" fill="#ffffff" opacity="0.9" />
            <circle cx="59.33%" cy="200" r="1.5" fill="#ffffff" opacity="0.7" />
            <circle cx="80%" cy="150" r="2" fill="#ffffff" opacity="0.5" />
            <circle cx="90%" cy="90" r="1" fill="#ffffff" opacity="0.8" />
            <circle cx="15.33%" cy="280" r="1.5" fill="#ffffff" opacity="0.6" />
            <circle cx="44.67%" cy="340" r="2" fill="#ffffff" opacity="0.7" />
            <circle cx="61.33%" cy="380" r="1" fill="#ffffff" opacity="0.9" />
            <circle cx="73.33%" cy="420" r="1.5" fill="#ffffff" opacity="0.5" />
            <circle cx="93.33%" cy="360" r="2" fill="#ffffff" opacity="0.8" />
            <circle cx="12%" cy="520" r="1" fill="#ffffff" opacity="0.7" />
            <circle cx="30%" cy="580" r="1.5" fill="#ffffff" opacity="0.6" />
            <circle cx="50.67%" cy="540" r="2" fill="#ffffff" opacity="0.8" />
            <circle cx="70%" cy="610" r="1" fill="#ffffff" opacity="0.5" />
            <circle cx="85.33%" cy="580" r="1.5" fill="#ffffff" opacity="0.9" />
            <circle cx="21.33%" cy="720" r="2" fill="#ffffff" opacity="0.7" />
            <circle cx="39.33%" cy="780" r="1" fill="#ffffff" opacity="0.6" />
            <circle cx="56%" cy="740" r="1.5" fill="#ffffff" opacity="0.8" />
            <circle cx="74.67%" cy="820" r="2" fill="#ffffff" opacity="0.5" />
            <circle cx="92%" cy="760" r="1" fill="#ffffff" opacity="0.7" />
            <circle cx="10%" cy="880" r="1.5" fill="#ffffff" opacity="0.9" />
            <circle cx="27.33%" cy="920" r="2" fill="#ffffff" opacity="0.6" />
            <circle cx="48%" cy="950" r="1" fill="#ffffff" opacity="0.8" />
            <circle cx="65.33%" cy="900" r="1.5" fill="#ffffff" opacity="0.7" />
            <circle cx="84%" cy="940" r="2" fill="#ffffff" opacity="0.5" />

            {/* Additional particles for left 30% density boost */}
            <circle cx="5%" cy="180" r="1" fill="#ffffff" opacity="0.7" />
            <circle cx="18%" cy="65" r="1.5" fill="#ffffff" opacity="0.5" />
            <circle cx="25%" cy="350" r="2" fill="#ffffff" opacity="0.8" />
            <circle cx="7%" cy="420" r="1" fill="#ffffff" opacity="0.6" />
            <circle cx="19%" cy="650" r="1.5" fill="#ffffff" opacity="0.7" />
            <circle cx="28%" cy="480" r="1" fill="#ffffff" opacity="0.5" />
            <circle cx="14%" cy="800" r="2" fill="#ffffff" opacity="0.9" />
            <circle cx="24%" cy="550" r="1.5" fill="#ffffff" opacity="0.6" />
          </g>

          {/* Medium particles */}
          <circle cx="18.67%" cy="160" r="2.5" fill="#8B5CF6" opacity="0.4" />
          <circle cx="34.67%" cy="240" r="3" fill="#3B82F6" opacity="0.5" />
          <circle cx="54%" cy="140" r="2.5" fill="#8B5CF6" opacity="0.3" />
          <circle cx="76.67%" cy="280" r="3" fill="#3B82F6" opacity="0.6" />
          <circle cx="88%" cy="220" r="2.5" fill="#8B5CF6" opacity="0.4" />
          <circle cx="25.33%" cy="450" r="3" fill="#3B82F6" opacity="0.5" />
          <circle cx="42.67%" cy="480" r="2.5" fill="#8B5CF6" opacity="0.3" />
          <circle cx="63.33%" cy="510" r="3" fill="#3B82F6" opacity="0.6" />
          <circle cx="78.67%" cy="460" r="2.5" fill="#8B5CF6" opacity="0.4" />
          <circle cx="17.33%" cy="650" r="3" fill="#3B82F6" opacity="0.5" />
          <circle cx="35.33%" cy="680" r="2.5" fill="#8B5CF6" opacity="0.3" />
          <circle cx="58.67%" cy="620" r="3" fill="#3B82F6" opacity="0.6" />
          <circle cx="82.67%" cy="700" r="2.5" fill="#8B5CF6" opacity="0.4" />
          <circle cx="30.67%" cy="840" r="3" fill="#3B82F6" opacity="0.5" />
          <circle cx="52.67%" cy="880" r="2.5" fill="#8B5CF6" opacity="0.3" />

          {/* Larger glowing particles */}
          <circle
            cx="28%"
            cy="180"
            r="4"
            fill="#A78BFA"
            opacity="0.3"
            filter="url(#glow)"
          />
          <circle
            cx="49.33%"
            cy="260"
            r="5"
            fill="#60A5FA"
            opacity="0.4"
            filter="url(#glow)"
          />
          <circle
            cx="72%"
            cy="320"
            r="4"
            fill="#A78BFA"
            opacity="0.3"
            filter="url(#glow)"
          />
          <circle
            cx="20%"
            cy="560"
            r="5"
            fill="#60A5FA"
            opacity="0.4"
            filter="url(#glow)"
          />
          <circle
            cx="66.67%"
            cy="740"
            r="4"
            fill="#A78BFA"
            opacity="0.3"
            filter="url(#glow)"
          />
          <circle
            cx="40%"
            cy="860"
            r="5"
            fill="#60A5FA"
            opacity="0.4"
            filter="url(#glow)"
          />

          {/* Additional large particles for right 35% and bottom 40% density boost */}
          <circle
            cx="78%"
            cy="680"
            r="4"
            fill="#A78BFA"
            opacity="0.3"
            filter="url(#glow)"
          />
          <circle
            cx="85%"
            cy="820"
            r="5"
            fill="#60A5FA"
            opacity="0.4"
            filter="url(#glow)"
          />
          <circle
            cx="92%"
            cy="920"
            r="4"
            fill="#A78BFA"
            opacity="0.3"
            filter="url(#glow)"
          />
          <circle
            cx="70%"
            cy="780"
            r="5"
            fill="#60A5FA"
            opacity="0.4"
            filter="url(#glow)"
          />
          <circle
            cx="88%"
            cy="650"
            r="4"
            fill="#A78BFA"
            opacity="0.3"
            filter="url(#glow)"
          />
          <circle
            cx="75%"
            cy="890"
            r="5"
            fill="#60A5FA"
            opacity="0.4"
            filter="url(#glow)"
          />

          {/* Additional scattered small particles for density */}
          <circle cx="6.33%" cy="190" r="1" fill="#ffffff" opacity="0.5" />
          <circle cx="14.33%" cy="370" r="1" fill="#ffffff" opacity="0.6" />
          <circle cx="24.33%" cy="90" r="1" fill="#ffffff" opacity="0.4" />
          <circle cx="32.33%" cy="310" r="1" fill="#ffffff" opacity="0.7" />
          <circle cx="41%" cy="420" r="1" fill="#ffffff" opacity="0.5" />
          <circle cx="49%" cy="170" r="1" fill="#ffffff" opacity="0.8" />
          <circle cx="57.67%" cy="490" r="1" fill="#ffffff" opacity="0.4" />
          <circle cx="65.67%" cy="280" r="1" fill="#ffffff" opacity="0.6" />
          <circle cx="74.33%" cy="560" r="1" fill="#ffffff" opacity="0.7" />
          <circle cx="82.33%" cy="380" r="1" fill="#ffffff" opacity="0.5" />
          <circle cx="91%" cy="640" r="1" fill="#ffffff" opacity="0.6" />
          <circle cx="9.67%" cy="750" r="1" fill="#ffffff" opacity="0.4" />
          <circle cx="18.33%" cy="510" r="1" fill="#ffffff" opacity="0.8" />
          <circle cx="26.33%" cy="690" r="1" fill="#ffffff" opacity="0.5" />
          <circle cx="35%" cy="150" r="1" fill="#ffffff" opacity="0.7" />
          <circle cx="43.67%" cy="830" r="1" fill="#ffffff" opacity="0.6" />
          <circle cx="51.67%" cy="410" r="1" fill="#ffffff" opacity="0.5" />
          <circle cx="60.33%" cy="660" r="1" fill="#ffffff" opacity="0.4" />
          <circle cx="68.33%" cy="190" r="1" fill="#ffffff" opacity="0.8" />
          <circle cx="76.33%" cy="710" r="1" fill="#ffffff" opacity="0.6" />
          <circle cx="86.33%" cy="490" r="1" fill="#ffffff" opacity="0.7" />
          <circle cx="12.67%" cy="230" r="1" fill="#ffffff" opacity="0.5" />
          <circle cx="20.67%" cy="890" r="1" fill="#ffffff" opacity="0.6" />
          <circle cx="29.33%" cy="410" r="1" fill="#ffffff" opacity="0.4" />
          <circle cx="38%" cy="610" r="1" fill="#ffffff" opacity="0.7" />
          <circle cx="46%" cy="290" r="1" fill="#ffffff" opacity="0.8" />
          <circle cx="54.67%" cy="810" r="1" fill="#ffffff" opacity="0.5" />
          <circle cx="62.67%" cy="430" r="1" fill="#ffffff" opacity="0.6" />
          <circle cx="71.33%" cy="890" r="1" fill="#ffffff" opacity="0.7" />
          <circle cx="79.33%" cy="240" r="1" fill="#ffffff" opacity="0.5" />
          <circle cx="88.67%" cy="510" r="1" fill="#ffffff" opacity="0.6" />
        </g>
      </svg>
      <img
        src={UpperBackgroundImage}
        alt="background"
        className="absolute top-0 left-0 min-w-full min-h-full object-cover pointer-events-none"
        style={{
          transform: "translateY(-30px)",
          /* Reference the SVG mask by ID */
          maskImage: "url(#upperBackgroundMask)",
          /* Optional: Add other mask properties for better control */
          maskMode: "alpha" /* or luminance */,
          maskRepeat: "no-repeat",
          maskSize: "cover",
        }}
      />
      <img
        src={LowerBackgroundImage}
        alt="background"
        className="absolute bottom-[-300px] left-0 min-w-full min-h-full object-cover pointer-events-none"
        style={{
          maskImage: "url(#lowerBackgroundMask)",
          maskMode: "alpha",
          maskRepeat: "no-repeat",
          maskSize: "cover",
        }}
      />
    </div>
  );
};

export default PrimaryBackground;
