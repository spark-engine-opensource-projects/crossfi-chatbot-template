// global.d.ts

declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

interface Window {
  __NEXT_DATA__?: any;
  ethereum?: ethers.Eip1193Provider;
}