const state={activeView:'chat',messages:[]};
const $=selector=>document.querySelector(selector);
const $$=selector=>document.querySelectorAll(selector);
const toast=(message)=>{const el=$('#toast');el.textContent=message;el.classList.add('show');setTimeout(()=>el.classList.remove('show'),2600)};

function switchView(view){
  state.activeView=view;
  $$('.nav-item').forEach(item=>item.classList.toggle('active',item.dataset.view===view));
  $$('.view').forEach(section=>section.classList.remove('active-view'));
  $(`#${view}View`).classList.add('active-view');
  const names={chat:'CHAT',create:'CREATE',code:'CODE',library:'LIBRARY'};
  $('#viewLabel').textContent=names[view];
  $('#pageTitle').textContent=view==='chat'?'Good morning, Suresh':({create:'Creative studio',code:'Engineering copilot',library:'Your library'}[view]);
}
function openChat(prompt=''){switchView('chat');if(prompt){$('#promptInput').value=prompt;$('#promptInput').focus();}}
function addMessage(text,from='user'){const area=$('#chatArea');if(state.messages.length===0)area.innerHTML='';state.messages.push({text,from});const row=document.createElement('div');row.className=`message ${from}`;row.innerHTML=from==='user'?`<div class="message-bubble">${text}</div><div class="avatar small-avatar">S</div>`:`<span class="mini-logo">N</span><div><strong>NOVA</strong><p>${text}</p></div>`;area.appendChild(row);area.scrollTop=area.scrollHeight;}
function respond(prompt){const lower=prompt.toLowerCase();let response='I can help you turn that into a clear plan. Tell me your audience, desired outcome, and any constraints, and I’ll map out the next steps.';if(lower.includes('visual')||lower.includes('image'))response='Great creative direction. I can help shape the concept, composition, lighting, style, and a production-ready prompt for your image.';else if(lower.includes('video'))response='Let’s make it cinematic. Share the subject, duration, aspect ratio, and mood, and I’ll create a shot list and generation prompt.';else if(lower.includes('code')||lower.includes('build')||lower.includes('error')||lower.includes('architecture'))response='I’m ready to pair with you. Paste your code or describe the feature, and I’ll break it into an implementation plan with clean, maintainable code.';setTimeout(()=>addMessage(response,'assistant'),450)}
$('#chatForm').addEventListener('submit',event=>{event.preventDefault();const input=$('#promptInput');const text=input.value.trim();if(!text)return;addMessage(text);input.value='';respond(text)});
$$('[data-view]').forEach(item=>item.addEventListener('click',()=>switchView(item.dataset.view)));
$$('[data-prompt]').forEach(item=>item.addEventListener('click',()=>openChat(item.dataset.prompt)));
$('#newChatButton').addEventListener('click',()=>{state.messages=[];$('#chatArea').innerHTML='<div class="welcome-message"><span class="mini-logo">N</span><div><strong>NOVA</strong><p>New conversation started. What would you like to create?</p></div></div>';openChat();toast('New conversation started')});
$('#libraryCreateButton').addEventListener('click',()=>switchView('create'));
$('.attach-button').addEventListener('click',()=>toast('File attachments will be available when an AI provider is connected.'));
$('.voice-button').addEventListener('click',()=>toast('Voice input is ready to connect to your speech provider.'));
document.addEventListener('keydown',event=>{if((event.metaKey||event.ctrlKey)&&event.key.toLowerCase()==='k'){event.preventDefault();$('#promptInput').focus()}});
