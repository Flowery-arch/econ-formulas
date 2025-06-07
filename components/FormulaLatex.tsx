import React from "react";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import styles from "../app/page.module.css";

export default function FormulaLatex({ formula }: { formula: string }) {
  return <div className={styles.katexWrapper}><BlockMath math={formula} /></div>;
}