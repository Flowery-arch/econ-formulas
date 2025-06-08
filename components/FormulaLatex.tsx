import React from "react";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import styles from "../app/page.module.css";

export default function FormulaLatex({ formula }: { formula: string }) {
  return (
    <div className={styles.katexWrapper} style={{ padding: '5px 0' }}>
      <div style={{ 
        width: '100%', 
        display: 'flex', 
        justifyContent: 'center',
        padding: '10px 0'
      }}>
        <BlockMath math={formula} />
      </div>
    </div>
  );
}