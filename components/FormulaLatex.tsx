import React from "react";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";

export default function FormulaLatex({ formula }: { formula: string }) {
  return <BlockMath math={formula} />;
}