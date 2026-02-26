(function(){
if(window.__WHITE_CLASS_TEST__)return;
window.__WHITE_CLASS_TEST__=true;

const style=document.createElement("style");
style.id="white-class-test-style";
style.textContent=`
.py_calc\\(var\\(--gap-md\\)_\\+_15px\\).px_var\\(--gap-md\\).lh_1\\.5rem.fs_1rem.ls_0\\.009375rem.fw_550{
color:#ffffff!important;
}
`;
document.head.appendChild(style);
})();
