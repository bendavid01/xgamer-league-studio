export function ControlCenterTool() {
  return <div style={{maxWidth:900,margin:'0 auto',padding:48,lineHeight:1.7}}>
    <p style={{letterSpacing:4,color:'#8de6ef'}}>XGAMER / OPERATIONS</p>
    <h1 style={{fontSize:48,lineHeight:1.1}}>Organizer Manager (OM)</h1>
    <p>CM is the Sanity editorial workspace for existing season teams, matches, rules and published content. OM is the separate cloud-hosted organizer workspace for applications, verification, tournament operations, announcements and access control. It does not run on your laptop.</p>
    <a href="https://xgamer-league-web.vercel.app/admin" target="_blank" rel="noopener noreferrer" style={{display:'inline-block',padding:'14px 24px',borderRadius:8,background:'#8de6ef',color:'#071722',fontWeight:700}}>Open Organizer Manager ↗</a>
    <h2>Separate access and data</h2>
    <p>Player contact details, consent records and finals room credentials are kept outside this public content dataset. Sanity membership does not grant OM access. Sign in separately with your authorized Discord identity. Registration and organizer access remain closed until the owner configures secure access.</p>
    <h2>Coordinator access</h2>
    <p>Studio permissions and Control Center permissions are separate. A coordinator must have service-enforced permissions that prohibit deletion and role management. Removing a visible action does not remove API access. Do not grant Studio write access until those permissions have been verified.</p>
  </div>
}
