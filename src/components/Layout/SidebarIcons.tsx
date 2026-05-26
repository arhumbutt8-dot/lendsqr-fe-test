import type { ReactNode } from 'react';

const iconProps = {
  width: 16,
  height: 16,
  viewBox: '0 0 16 16',
  fill: 'none' as const,
};

function Icon({ children }: { children: ReactNode }) {
  return <svg {...iconProps}>{children}</svg>;
}

export function BriefcaseIcon() {
  return (
    <Icon>
      <path d="M13.3333 4.66667H2.66667C1.93029 4.66667 1.33333 5.26362 1.33333 6V12.6667C1.33333 13.403 1.93029 14 2.66667 14H13.3333C14.0697 14 14.6667 13.403 14.6667 12.6667V6C14.6667 5.26362 14.0697 4.66667 13.3333 4.66667Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10.6667 14V3.33333C10.6667 2.97971 10.5262 2.64057 10.2761 2.39052C10.0261 2.14048 9.68696 2 9.33333 2H6.66667C6.31304 2 5.9739 2.14048 5.72386 2.39052C5.47381 2.64057 5.33333 2.97971 5.33333 3.33333V14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </Icon>
  );
}

export function HomeIcon() {
  return (
    <Icon>
      <path d="M2 6.66667L8 1.33333L14 6.66667V13.3333C14 13.687 13.8595 14.0261 13.6095 14.2761C13.3594 14.5262 13.0203 14.6667 12.6667 14.6667H3.33333C2.97971 14.6667 2.64057 14.5262 2.39052 14.2761C2.14048 14.0261 2 13.687 2 13.3333V6.66667Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6 14.6667V8H10V14.6667" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </Icon>
  );
}

export function UserIcon() {
  return (
    <Icon>
      <path d="M13.3333 14V12.6667C13.3333 11.1939 12.1394 10 10.6667 10H5.33333C3.86057 10 2.66667 11.1939 2.66667 12.6667V14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 7.33333C9.47276 7.33333 10.6667 6.13943 10.6667 4.66667C10.6667 3.19391 9.47276 2 8 2C6.52724 2 5.33333 3.19391 5.33333 4.66667C5.33333 6.13943 6.52724 7.33333 8 7.33333Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </Icon>
  );
}

export function UsersIcon() {
  return (
    <Icon>
      <path d="M10.6667 14V12.6667C10.6667 11.9594 10.3857 11.2811 9.88562 10.781C9.38552 10.281 8.70724 10 8.00001 10H3.33334C2.62610 10 1.94782 10.281 1.44772 10.781C0.947625 11.2811 0.666672 11.9594 0.666672 12.6667V14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5.66667 7.33333C7.13943 7.33333 8.33333 6.13943 8.33333 4.66667C8.33333 3.19391 7.13943 2 5.66667 2C4.19391 2 3 3.19391 3 4.66667C3 6.13943 4.19391 7.33333 5.66667 7.33333Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M15.3333 14V12.6667C15.3329 12.0758 15.1362 11.5019 14.7742 11.0349C14.4122 10.5679 13.9054 10.2344 13.3333 10.0867" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10.6667 2.08667C11.2404 2.23354 11.7488 2.56714 12.1118 3.03488C12.4748 3.50262 12.6719 4.07789 12.6719 4.67C12.6719 5.26212 12.4748 5.83739 12.1118 6.30513C11.7488 6.77287 11.2404 7.10647 10.6667 7.25334" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </Icon>
  );
}

export function MoneyBagIcon() {
  return (
    <Icon>
      <path d="M8 1.33333V2.66667" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M5.33333 2.66667H10.6667C11.403 2.66667 12 3.26362 12 4V5.33333C12 6.80609 10.8061 8 9.33333 8H6.66667C5.19391 8 4 6.80609 4 5.33333V4C4 3.26362 4.59695 2.66667 5.33333 2.66667Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4 8C2.89543 8 2 8.89543 2 10V12.6667C2 13.403 2.59695 14 3.33333 14H12.6667C13.403 14 14 13.403 14 12.6667V10C14 8.89543 13.1046 8 12 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 10.6667V11.3333" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </Icon>
  );
}

export function HandshakeIcon() {
  return (
    <Icon>
      <path d="M2 8L4.66667 10.6667L7.33333 8L10 10.6667L12.6667 8L14 9.33333" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 5.33333L5.33333 2L8 4.66667L10.6667 2L14 5.33333" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </Icon>
  );
}

export function PiggyBankIcon() {
  return (
    <Icon>
      <path d="M3.33333 8.66667C3.33333 10.5076 5.15833 12 7.33333 12H9.33333C11.1743 12 12.6667 10.5076 12.6667 8.66667V7.33333C12.6667 5.49238 11.1743 4 9.33333 4H7.33333C5.15833 4 3.33333 5.49238 3.33333 7.33333V8.66667Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12.6667 7.33333H14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <circle cx="6" cy="8" r="0.666667" fill="currentColor"/>
      <path d="M2 6.66667V10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </Icon>
  );
}

export function CoinHandIcon() {
  return (
    <Icon>
      <path d="M8 2.66667C9.47276 2.66667 10.6667 3.86057 10.6667 5.33333C10.6667 6.80609 9.47276 8 8 8C6.52724 8 5.33333 6.80609 5.33333 5.33333C5.33333 3.86057 6.52724 2.66667 8 2.66667Z" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M2.66667 13.3333C2.66667 11.1242 4.45724 9.33333 6.66667 9.33333H9.33333C11.5424 9.33333 13.3333 11.1242 13.3333 13.3333" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M12 4L14 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </Icon>
  );
}

export function UserCheckIcon() {
  return (
    <Icon>
      <path d="M10.6667 14V12.6667C10.6667 11.1939 9.47276 10 8 10H3.33333C1.86057 10 0.666672 11.1939 0.666672 12.6667V14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5.33333 7.33333C6.80609 7.33333 8 6.13943 8 4.66667C8 3.19391 6.80609 2 5.33333 2C3.86057 2 2.66667 3.19391 2.66667 4.66667C2.66667 6.13943 3.86057 7.33333 5.33333 7.33333Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14 6L12 8L11 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </Icon>
  );
}

export function UserSlashIcon() {
  return (
    <Icon>
      <path d="M10.6667 14V12.6667C10.6667 11.1939 9.47276 10 8 10H3.33333" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5.33333 7.33333C6.80609 7.33333 8 6.13943 8 4.66667C8 3.19391 6.80609 2 5.33333 2C3.86057 2 2.66667 3.19391 2.66667 4.66667" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 2L14 14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </Icon>
  );
}

export function BankIcon() {
  return (
    <Icon>
      <path d="M2 6.66667L8 2.66667L14 6.66667" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3.33333 6.66667V12.6667" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M6.66667 6.66667V12.6667" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M9.33333 6.66667V12.6667" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M12.6667 6.66667V12.6667" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M2 12.6667H14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </Icon>
  );
}

export function CoinsIcon() {
  return (
    <Icon>
      <ellipse cx="6" cy="5.33333" rx="3.33333" ry="1.33333" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M2.66667 5.33333V8.66667C2.66667 9.40305 4.02944 10 6 10C7.97056 10 9.33333 9.40305 9.33333 8.66667V5.33333" stroke="currentColor" strokeWidth="1.2"/>
      <ellipse cx="10.6667" cy="8" rx="3.33333" ry="1.33333" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M7.33333 8V11.3333C7.33333 12.0697 8.6961 12.6667 10.6667 12.6667C12.6372 12.6667 14 12.0697 14 11.3333V8" stroke="currentColor" strokeWidth="1.2"/>
    </Icon>
  );
}

export function PhoneIcon() {
  return (
    <Icon>
      <rect x="4.66667" y="1.33333" width="6.66667" height="13.3333" rx="1.33333" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M7.33333 12H8.66667" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </Icon>
  );
}

export function GalaxyIcon() {
  return (
    <Icon>
      <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M8 1.33333V3.33333M8 12.6667V14.6667M1.33333 8H3.33333M12.6667 8H14.6667M3.51472 3.51472L4.92896 4.92896M11.071 11.071L12.4853 12.4853M3.51472 12.4853L4.92896 11.071M11.071 4.92896L12.4853 3.51472" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </Icon>
  );
}

export function UserGearIcon() {
  return (
    <Icon>
      <path d="M10.6667 14V12.6667C10.6667 11.1939 9.47276 10 8 10H3.33333" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5.33333 7.33333C6.80609 7.33333 8 6.13943 8 4.66667C8 3.19391 6.80609 2 5.33333 2C3.86057 2 2.66667 3.19391 2.66667 4.66667C2.66667 6.13943 3.86057 7.33333 5.33333 7.33333Z" stroke="currentColor" strokeWidth="1.2"/>
      <circle cx="12.6667" cy="4" r="1.33333" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M12.6667 2V2.66667M12.6667 5.33333V6M14.3333 4H13.6667M11.6667 4H11M13.9 2.76667L13.4333 3.23333M11.9 4.76667L11.4333 5.23333M13.9 5.23333L13.4333 4.76667M11.9 3.23333L11.4333 2.76667" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round"/>
    </Icon>
  );
}

export function ScrollIcon() {
  return (
    <Icon>
      <path d="M4 2.66667H10.6667C11.403 2.66667 12 3.26362 12 4V12.6667C12 13.403 11.403 14 10.6667 14H5.33333C4.59695 14 4 13.403 4 12.6667V4C4 3.26362 4.59695 2.66667 5.33333 2.66667H4Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M8 6H10.6667M8 9.33333H10.6667" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </Icon>
  );
}

export function ChartIcon() {
  return (
    <Icon>
      <path d="M2 14V6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M6 14V2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M10 14V8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M14 14V4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </Icon>
  );
}

export function SlidersIcon() {
  return (
    <Icon>
      <path d="M2 4H14M2 8H14M2 12H14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <circle cx="5.33333" cy="4" r="1.33333" fill="currentColor"/>
      <circle cx="10.6667" cy="8" r="1.33333" fill="currentColor"/>
      <circle cx="7.33333" cy="12" r="1.33333" fill="currentColor"/>
    </Icon>
  );
}

export function PercentIcon() {
  return (
    <Icon>
      <path d="M4.66667 11.3333L11.3333 4.66667" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <circle cx="5.33333" cy="5.33333" r="1.33333" stroke="currentColor" strokeWidth="1.2"/>
      <circle cx="10.6667" cy="10.6667" r="1.33333" stroke="currentColor" strokeWidth="1.2"/>
    </Icon>
  );
}

export function ClipboardIcon() {
  return (
    <Icon>
      <path d="M10 1.33333H3.33333C2.97971 1.33333 2.64057 1.47381 2.39052 1.72386C2.14048 1.9739 2 2.31304 2 2.66667V13.3333C2 13.687 2.14048 14.0261 2.39052 14.2761C2.64057 14.5262 2.97971 14.6667 3.33333 14.6667H12.6667C13.0203 14.6667 13.3594 14.5262 13.6095 14.2761C13.8595 14.0261 14 13.687 14 13.3333V5.33333L10 1.33333Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 1.33333V5.33333H14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5.33333 8H10.6667M5.33333 11.3333H8.66667" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </Icon>
  );
}

export function MessageClockIcon() {
  return (
    <Icon>
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M8 5.33333V8L9.33333 9.33333" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </Icon>
  );
}

export function LogoutIcon() {
  return (
    <Icon>
      <path d="M6 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V3.33333C2 2.97971 2.14048 2.64057 2.39052 2.39052C2.64057 2.14048 2.97971 2 3.33333 2H6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10.6667 11.3333L14 8L10.6667 4.66667" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14 8H6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </Icon>
  );
}
