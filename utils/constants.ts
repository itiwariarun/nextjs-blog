export const COLOR_SCHEME_QUERY = "(prefers-color-scheme: dark)";
export const LOCAL_STORAGE_KEY = "use-dark-mode";
export const IS_SERVER = typeof window === "undefined";
export const PlaceHolderTextArea = {
  title: "Lorem Ipsum Content Block",
  summary:
    "A structured layout of Lorem Ipsum placeholder text to simulate real-world document structure, supporting UI design and content formatting.",
  meta: {
    title: "Structured Placeholder Content",
    description:
      "Formatted Lorem Ipsum text with clear sections for design testing and layout previews.",
    keywords: [
      "Lorem Ipsum",
      "Placeholder",
      "UI Testing",
      "Content Layout",
      "Design Mockup",
      "Sample Text",
    ],
  },
  sections: [
    {
      heading: "Overview and Introduction",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi viverra rutrum scelerisque. Mauris fringilla efficitur pellentesque. Aliquam gravida, purus placerat feugiat lacinia, lorem mi cursus metus, in venenatis velit ligula consequat lectus. Sed et urna aliquam, scelerisque sem ac, elementum eros. Aliquam sed vestibulum justo. Quisque turpis erat, placerat nec congue rutrum, laoreet eu libero. Proin accumsan velit ligula. Ut viverra turpis eu vulputate aliquam.",
    },
    {
      heading: "Core Paragraph Simulation",
      content:
        "Nulla posuere non est a feugiat. Maecenas auctor sagittis ante, nec pretium purus. Nam placerat urna erat, sed vehicula risus sollicitudin vitae. Vestibulum malesuada sit amet elit a fermentum. Vivamus maximus, nibh rhoncus sodales imperdiet, sapien nulla tincidunt dolor, sit amet posuere libero orci ut elit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus mattis magna vitae neque rhoncus finibus.",
    },
    {
      heading: "Extended Paragraph & Responsive Formatting",
      description:
        "Advanced layout testing with nested formatting and longer paragraph structure.",
      code: {
        language: "txt",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce in nisi eu libero vehicula fermentum quis id dolor. Donec cursus, est nec interdum auctor, lorem diam bibendum libero, non iaculis nibh leo non risus. Proin dapibus volutpat mi in commodo. Phasellus ut ex quis arcu semper porttitor a id eros. Maecenas quis vestibulum orci. Integer sagittis placerat metus, eget ultricies erat maximus nec. Integer vestibulum arcu vel volutpat semper.",
      },
    },
    {
      heading: "Footer Simulation",
      content:
        "Cras tincidunt suscipit ante, porttitor rutrum nulla malesuada ac. Nunc a est sit amet lorem laoreet tempus. Ut pharetra a mauris a finibus. Vivamus sed ante at arcu egestas suscipit. Aenean rutrum libero id ligula sodales, et tempor turpis sodales. Ut imperdiet varius est ac sollicitudin. Donec tristique magna lectus, id.",
    },
  ],
};
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
