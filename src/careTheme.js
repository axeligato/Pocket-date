// Shared Care Mode colors: one ink, two neutral surfaces, and one warm-blue accent.
export const CARE_COLORS={
 ink:"#073B4C",
 paper:"#FFFAF2",
 surface:"#FFFFFF",
 muted:"#526773",
 rose:"#A9D6E5",
 gold:"#A9D6E5",
};
export const careSectionStyle={border:"3px solid "+CARE_COLORS.ink,borderRadius:19,background:CARE_COLORS.surface,boxShadow:"4px 5px 0 "+CARE_COLORS.ink,overflow:"hidden"};
export const careSummaryStyle={cursor:"pointer",padding:"16px 17px",fontFamily:"'Fredoka One',cursive",fontSize:17,color:CARE_COLORS.ink,listStyle:"none",display:"flex",alignItems:"center",justifyContent:"space-between",gap:8};
