// Shared Care Mode colors: one ink, two neutral surfaces, and one warm-pink accent.
export const CARE_COLORS={
 ink:"#073B4C",
 paper:"#FFFAF2",
 surface:"#FFFFFF",
 muted:"#526773",
 rose:"#F4A7B9",
 gold:"#F4A7B9",
};
export const careSectionStyle={border:"3px solid "+CARE_COLORS.ink,borderRadius:19,background:CARE_COLORS.surface,boxShadow:"4px 5px 0 "+CARE_COLORS.ink,overflow:"hidden"};
export const careSummaryStyle={cursor:"pointer",padding:"16px 17px",fontFamily:"'Fredoka One',cursive",fontSize:17,color:CARE_COLORS.ink,listStyle:"none",display:"flex",alignItems:"center",justifyContent:"space-between",gap:8};
