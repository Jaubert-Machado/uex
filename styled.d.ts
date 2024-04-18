import "stylerd-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      text: {
        primary: string;
        secondary: string;
        tertiary: string;
        error: string;
      };
      container: {
        primary: string;
        primaryLight: string;
        secondary: string;
        tertiary: string;
        error: string;
      };
      surface: {
        neutral: string;
        dim: string;
        bright: string;
      };
    };
    paddings: {
      small: string;
      medium: string;
      large: string;
    };
  }
}
