

var __main__1 = entryPoint = function (s) {
var r0 = s.r0, step = s.pc;
s.pc = -1;
while (true) {
if (yieldSteps-- < 0 && maybeYield(s, step, r0)) return null;
switch (step) {
  case 0:

    s.lastBrkId = 1;
    r0 = pxsim.Array_.mk(0);
    s.tmp_0 = r0;
    r0 = globals.freqTable___119;
    pxtrt.decr(r0);
    r0 = s.tmp_0;
    globals.freqTable___119 = (r0);
    s.lastBrkId = 2;
    setupResume(s, 2);
    pxsim.basic.showLeds(new pxsim.Image(5, [0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,42]), 400);
    checkResumeConsumed();
    return;
  case 2:
    r0 = s.retval;
  case 1:
    return leave(s, r0)
  default: oops()
} } }
__main__1.info = {"start":0,"length":0,"line":0,"column":0,"endLine":0,"endColumn":0,"fileName":"pxt_modules/core/dal.d.ts","functionName":"<main>"}
__main__1.continuations = [ 2 ]


setupDebugger(3)

pxsim.setupStringLiterals({})
