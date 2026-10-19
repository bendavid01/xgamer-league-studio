export function ControlCenterTool() {
  return <div style={{maxWidth:900,margin:'0 auto',padding:48,lineHeight:1.7}}>
    <p style={{letterSpacing:4,color:'#8de6ef'}}>XGAMER / OPERATIONS</p>
    <h1 style={{fontSize:48,lineHeight:1.1}}>The league, under control.</h1>
    <p>Manage the October Cup through the private Control Center. Existing season teams, matches and audit records remain in this Studio.</p>
    <a href="https://xgamer-league-web.vercel.app/admin" target="_blank" rel="noopener noreferrer" style={{display:'inline-block',padding:'14px 24px',borderRadius:8,background:'#8de6ef',color:'#071722',fontWeight:700}}>Open Control Center ↗</a>
    <h2>Private by design</h2>
    <p>Player contact details, consent records and finals room credentials are kept outside this public content dataset. Sign in separately with your authorized Discord identity. Registration and organizer access remain closed until the owner configures secure access.</p>
    <h2>Coordinator access</h2>
    <p>Studio permissions and Control Center permissions are separate. A coordinator must have service-enforced permissions that prohibit deletion and role management. Removing a visible action does not remove API access. Do not grant Studio write access until those permissions have been verified.</p>
  </div>
}
