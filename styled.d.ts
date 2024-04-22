import "stylerd-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      text: {
        primary: string;
        onPrimary: string;
        error: string;
        neutral: string;
      };
      container: {
        primary: string;
        primaryLight: string;
        primaryDark: string;
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
