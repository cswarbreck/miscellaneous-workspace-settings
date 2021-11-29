Object.defineProperty(exports,"__esModule",{value:!0})
var t=require("vscode"),e=require("fs"),i=require("child_process"),s=require("path"),a=require("url")
const o=t=>"file"===t?.document.uri.scheme,n=e=>t.workspace.getConfiguration("gitblame").get(e),r=[["year",315576e5],["month",26298e5],["day",864e5],["hour",36e5],["minute",6e4]],c=(e,i)=>{const s=e.valueOf()-i.valueOf()
for(const[e,i]of r)if(s>i)return new Intl.RelativeTimeFormat(t.env.language).format(-1*Math.round(s/i),e)
return"right now"},m=({author:t,committer:e,hash:i,summary:s})=>{const a=new Date,o=({date:t})=>t.toISOString().slice(0,10),n=c(a,t.date),r=c(a,e.date),m=(t,e)=>(i="")=>t.substr(0,parseInt(i||e,10))
return{"author.mail":t.mail,"author.name":t.name,"author.timestamp":t.timestamp,"author.tz":t.tz,"author.date":o(t),"committer.mail":e.mail,"committer.name":e.name,"committer.timestamp":e.timestamp,"committer.tz":e.tz,"committer.date":o(e),"commit.hash":m(i,"40"),"commit.hash_short":m(i,"7"),"commit.summary":m(s,"65536"),"time.ago":n,"time.c_ago":r}},l=(t,e,i)=>s=>{const a=t.indexOf(s,e)
return-1===a?i:a},h=(t,e)=>(i,s)=>s===i||e===i?"":t.substring(i+1,s),u=(t,e="")=>"u"===e?t.toUpperCase():"l"===e?t.toLowerCase():e?`${t}|${e}`:t,d=(t,e)=>{let i=""
for(const[s,a,o]of function*(t,e){let i=0,s=0,a=0
for(let o=0;o<t.length;o++)if(0===a&&"$"===t[o])a=2
else if(2===a&&"{"===t[o])a=1,s=o-1,yield[t.slice(i,s)],i=s
else if(1===a){a=0
const s=t.indexOf("}",o)
if(-1===s)break
const n=l(t,o,s),r=h(t,s),c=n(","),m=n("|"),u=t.substring(o,Math.min(c,m))
yield[e[u]??u,r(m,s),r(c,m)],i=s+1}else 2===a&&(a=0)
yield[t.slice(i)]}(t,e))i+=u("string"==typeof s?s:s(o),a)
return i}
function p(t){return/^0{40}$/.test(t.hash)}class f{constructor(){this.createStatusBarItem(),t.workspace.onDidChangeConfiguration((t=>{t.affectsConfiguration("gitblame")&&this.createStatusBarItem()}))}createStatusBarItem(){this.out&&this.out.dispose(),this.out=t.window.createStatusBarItem(n("statusBarMessageDisplayRight")?t.StatusBarAlignment.Right:t.StatusBarAlignment.Left,n("statusBarPositionPriority")),this.out.show()}set(t){t?p(t)?this.text(n("statusBarMessageNoCommit"),!1):this.text((t=>d(n("statusBarMessageFormat"),m(t)))(t),!0):this.text("",!1)}activity(){this.text("$(sync~spin) Waiting for git blame response",!1)}dispose(){this.out?.dispose()}command(){return"Open tool URL"===n("statusBarMessageClickAction")?"gitblame.online":"gitblame.quickInfo"}text(t,e){this.out.text="$(git-commit) "+t.trimEnd(),this.out.tooltip="git blame"+(e?"":" - No info about the current line"),this.out.command=e?this.command():void 0}}const w=(t,e=" ")=>{const i=t.indexOf(e[0])
return-1===i?[t,""]:[t.substr(0,i),t.substr(i+1).trim()]},g=()=>({author:{mail:"",name:"",timestamp:"",date:new Date,tz:""},committer:{mail:"",name:"",timestamp:"",date:new Date,tz:""},hash:"E",summary:""}),y=t=>/^\w{40}$/.test(t),v=(t,e,i)=>{"summary"===t?i.summary=e:y(t)?i.hash=t:((t,e,i)=>{const[s,a]=w(t,"-")
"author"!==s&&"committer"!==s||((t,e,i)=>{"time"===e?(t.timestamp=i,t.date=new Date(1e3*parseInt(i,10))):"tz"===e||"mail"===e?t[e]=i:""===e&&(t.name=i)})(i[s],a,e)})(t,e,i)}
function*b(t,e){const[,i,s]=e.split(" ").map(Number)
for(let e=0;e<s;e++)yield[i+e,t]}function*x(t,e,i){if("E"===t.hash)return
const s=i.get(t.hash)
i.set(t.hash,s??t),yield[s??t,e]}function*$(t,e){let i=g(),s=function*(){}()
for(const[o,n]of function*(t){let e=0
for(;e<t.length;){const i=t.indexOf("\n",e)
yield w(t.toString("utf8",e,i)),e=i+1}}(t))a=n,y(o)&&/^\d+ \d+ \d+$/.test(a)&&(yield*x(i,s,e),s=b(o,n),i.hash!==o&&(i=g())),v(o,n,i)
var a
yield*x(i,s,e)}class C{constructor(){this.out=t.window.createOutputChannel("Git Blame")}static getInstance(){return C.instance=C.instance??new C,C.instance}static error(t){C.write("error",""+t)}static write(t,e){C.getInstance().out.appendLine(`[ ${(new Date).toTimeString().substr(0,8)} | ${t} ] ${e.trim()}`)}dispose(){C.instance=void 0,this.out.dispose()}}const M=()=>t.window.activeTextEditor,U=({document:t,selection:e})=>"file"!==t.uri.scheme?"N:-1":`${t.fileName}:${e.active.line}`,k=()=>{const e=t.extensions.getExtension("vscode.git")
return e?.exports.enabled?e.exports.getAPI(1).git.path:"git"},D=(t,...e)=>(async(t,e,s={})=>{let a
C.write("command",`${t} ${e.join(" ")}`)
try{a=i.execFile(t,e,{...s,encoding:"utf8"})}catch(t){return C.error(t),""}let o=""
for await(const t of a?.stdout??[])o+=t
return o.trim()})(k(),e,{cwd:s.dirname(t)}),I=async()=>{const t=M()
if(!o(t))return""
const{fileName:e}=t.document
return D(e,"ls-files","--full-name","--",e)}
class L{constructor(t){this.killed=!1,this.store=this.blame(t)}dispose(){this.process?.kill(),this.killed=!0}async*run(t){this.process=(t=>{const e=["blame","--incremental","--",t]
return n("ignoreWhitespace")&&e.splice(1,0,"-w"),C.write("command",`${k()} ${e.join(" ")}`),i.spawn(k(),e,{cwd:s.dirname(t)})})(t)
const e=new Map
for await(const t of this.process?.stdout??[])yield*$(t,e)
for await(const t of this.process?.stderr??[])throw Error(t)}async blame(t){const e=new Map,i=new Map
try{for await(const[s,a]of this.run(t)){i.set(s.hash,s)
for(const[t,s]of a)e.set(t,i.get(s))}}catch(t){C.error(t),this.dispose()}if(!this.killed)return C.write("info",`Blamed "${t}": ${i.size} commits`),e}}class T{constructor(){this.files=new Map,this.fsWatchers=new Map}async file(t){return this.get(t)}async getLine(t,e){const i=e+1
return(await this.get(t))?.get(i)}async remove(t){(await this.files.get(t))?.dispose(),this.fsWatchers.get(t)?.close(),this.files.delete(t),this.fsWatchers.delete(t)}dispose(){for(const[t]of this.files)this.remove(t)}async get(t){if(!this.files.has(t)){const i=this.create(t)
i.then((i=>{i&&this.fsWatchers.set(t,e.watch(t.fileName,(()=>this.remove(t))))})),this.files.set(t,i)}return(await this.files.get(t))?.store}async create({fileName:t}){try{if(await e.promises.access(t),await(async t=>!!await D(t,"rev-parse","--git-dir"))(t))return new L(t)}catch{}C.write("info",`Will not blame '${t}'. Outside the current workspace.`)}}const z=t=>t.replace(/\.git$/i,""),B=t=>z(t).replace(/^([a-z-]+:\/\/)?([\w%:\\]+?@)?/i,"").replace(/:([a-z_.~+%-][a-z0-9_.~+%-]+)\/?/i,"/$1/"),N=(t,e)=>{const i=/^(https?):/.exec(t)?.[1]
let s
try{s=new a.URL(`${i??"https"}://${B(t)}`)}catch(t){return}var o
return s.port=i?s.port:"",s.pathname+=`/commit${o=t,n("isWebPathPlural")||(n("pluralWebPathSubstrings")??[]).some((t=>o.includes(t)))?"s":""}/${e}`,s},S=t=>/([a-zA-Z0-9_~%+.-]*?)(\.git)?$/.exec(t)?.[1]??"",E=(e,i=[])=>Promise.resolve(t.window.showInformationMessage(e,...i)),O=(e,...i)=>Promise.resolve(t.window.showErrorMessage(e,...i)),P=(t,e,i="/")=>t.split(i).filter((t=>!!t))[Number(e)]||"invalid-index",W=({hostname:t})=>e=>""===e?t:P(t,e,"."),q=t=>{if(/^[a-z]+?@/.test(t)){const[,e]=w(t,":")
return(t="")=>""===t?"/"+e:P(e,t)}try{const{pathname:e}=new a.URL(t)
return(t="")=>""===t?e:P(e,t)}catch{return()=>"no-remote-url"}},R=async e=>{if(!e||p(e))return
const[i,s]=await(async t=>{const e=n("remoteName"),i=await(async t=>{const e=M()
return o(e)?D(e.document.fileName,"ls-remote","--get-url",t):""})(e),s=B(await(async t=>{const e=M()
if(!o(e))return""
const{fileName:i}=e.document,s=await D(i,"symbolic-ref","-q","--short","HEAD"),a=await D(i,"config",`branch.${s}.remote`)
return D(i,"config",`remote.${a||t}.url`)})(e)),a=N(s,"")
return[i,{hash:t.hash,"project.name":S(i),"project.remote":s,"gitorigin.hostname":a?W(a):"no-origin-url","gitorigin.path":q(z(i)),"file.path":await I()}]})(e),r=d(n("commitUrl"),s)
return(t=>{let e
try{e=new a.URL(t)}catch(t){return!1}return e.href===t&&("http:"===e.protocol||"https:"===e.protocol)&&!(!e.hostname||!e.pathname)})(r)?t.Uri.parse(r,!0):!r&&i?((e,i)=>{const s=N(e,i.hash)
if(s)return t.Uri.parse(""+s,!0)})(i,e):void(i&&O(`Malformed gitblame.commitUrl: '${r}'`))}
class _{constructor(){this.blame=new T,this.view=new f,this.disposable=this.setupListeners(),this.updateView()}async blameLink(){const e=await R(await this.commit(!0))
e?t.commands.executeCommand("vscode.open",e):O("Empty gitblame.commitUrl")}async showMessage(){const e=await this.commit()
if(!e||p(e))return void this.view.set()
const i=d(n("infoMessageFormat"),m(e)),s=await R(e),a=s?[{title:"View",action(){t.commands.executeCommand("vscode.open",s)}}]:void 0
this.view.set(e),(await E(i,a))?.action()}async copyHash(){const e=await this.commit(!0)
e&&!p(e)&&(await t.env.clipboard.writeText(e.hash),E("Copied hash"))}async copyToolUrl(){const e=await this.commit(!0),i=await R(e)
i?(await t.env.clipboard.writeText(""+i),E("Copied tool URL")):O("gitblame.commitUrl config empty")}dispose(){this.view.dispose(),this.disposable.dispose(),this.blame.dispose()}setupListeners(){const e=t=>{const{scheme:e}=t.document.uri
"file"!==e&&"untitled"!==e||this.updateView(t)}
return t.Disposable.from(t.window.onDidChangeActiveTextEditor((t=>{o(t)?(this.view.activity(),this.blame.file(t.document),e(t)):this.view.set()})),t.window.onDidChangeTextEditorSelection((({textEditor:t})=>{e(t)})),t.workspace.onDidSaveTextDocument((()=>{this.updateView()})),t.workspace.onDidCloseTextDocument((t=>{this.blame.remove(t)})))}async updateView(t=M()){if(!o(t))return void this.view.set()
this.view.activity()
const e=U(t),i=await this.blame.getLine(t.document,t.selection.active.line),s=U(t)
e!==s&&"N:-1"!==s||this.view.set(i)}async commit(t=!1){const e=()=>O("Unable to blame current line"),i=M()
if(!o(i))return void e()
t||this.view.activity()
const s=await this.blame.getLine(i.document,i.selection.active.line)
return s||e(),s}}const A=(e,i)=>t.commands.registerCommand("gitblame."+e,i)
exports.activate=t=>{const e=new _
t.subscriptions.push(e,C.getInstance(),A("quickInfo",(()=>{e.showMessage()})),A("online",(()=>{e.blameLink()})),A("addCommitHashToClipboard",(()=>{e.copyHash()})),A("addToolUrlToClipboard",(()=>{e.copyToolUrl()})))}
