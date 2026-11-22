import{readFileSync,readdirSync,mkdirSync,writeFileSync}from'node:fs';
import{join}from'node:path';
const I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output';
function V(P,B){
 const n=P.length;
 let D=new Int32Array(256),s=0,C=new Int32Array(64),t=0,M=new Int32Array(256),o=new Uint8Array(65536),l=0,q=0,p=0,x=0,a,b,r,y;
 const F=e=>[o.subarray(0,l),e];
 for(;;){
  if(x==1e6)return F(10);
  if(p<0||p>=n)return F(9);
  const c=P[p];
  let m=0,u=0,v=0;
  if(c>15&&c<35&&c!=31){u=c==23||c==27?1:2;v=1}
  else switch(c){
   case 1:m=1;v=1;break;
   case 2:m=4;v=1;break;
   case 3:u=1;break;
   case 4:u=1;v=2;break;
   case 5:u=2;v=2;break;
   case 6:u=2;v=3;break;
   case 7:u=3;v=3;break;
   case 48:case 51:m=2;break;
   case 49:case 50:m=2;u=1;break;
   case 52:break;
   case 64:u=1;v=1;break;
   case 65:u=2;break;
   case 80:case 81:case 83:u=1;break;
   case 82:v=1;break;
   case 0:break;
   default:return F(5);
  }
  if(p+m>=n)return F(9);
  x++;
  const g=p+1+m;
  if(s<u)return F(2);
  if(s-u+v>256)return F(3);
  p=g;
  switch(c){
   case 0:return F(0);
   case 1:D[s++]=P[g-1]<<24>>24;break;
   case 2:D[s++]=P[g-4]|P[g-3]<<8|P[g-2]<<16|P[g-1]<<24;break;
   case 3:s--;break;
   case 4:D[s]=D[s-1];s++;break;
   case 5:a=D[s-1];D[s-1]=D[s-2];D[s-2]=a;break;
   case 6:D[s]=D[s-2];s++;break;
   case 7:a=D[s-3];D[s-3]=D[s-2];D[s-2]=D[s-1];D[s-1]=a;break;
   case 23:D[s-1]=-D[s-1]|0;break;
   case 27:D[s-1]=~D[s-1];break;
   case 48:case 49:case 50:
    r=(P[g-2]|P[g-1]<<8)<<16>>16;
    if(c==48){p=g+r;break;}
    a=D[--s];
    if(c==49?a==0:a!=0)p=g+r;
    break;
   case 51:
    if(t==64)return F(7);
    C[t++]=g;p=P[g-2]|P[g-1]<<8;break;
   case 52:
    if(t==0)return F(8);
    p=C[--t];break;
   case 64:
    a=D[s-1];if(a<0||a>255)return F(6);D[s-1]=M[a];break;
   case 65:
    a=D[s-1];b=D[s-2];if(a<0||a>255)return F(6);s-=2;M[a]=b;break;
   case 80:
    y=String(D[s-1]);if(l+y.length>65536)return F(11);s--;for(let i=0;i<y.length;i++)o[l++]=y.charCodeAt(i);break;
   case 81:
    if(l+1>65536)return F(11);o[l++]=D[--s]&255;break;
   case 82:D[s++]=q<B.length?B[q++]:-1;break;
   case 83:return F(D[--s]&255);
   default:
    b=D[s-1];a=D[s-2];
    if(c<19)r=c==16?a+b|0:c==17?a-b|0:Math.imul(a,b);
    else if(c<23){if(!b)return F(4);r=c==19?a==-2147483648&&b==-1?a:(a/b)|0:c==20?b==-1?0:a%b|0:c==21?Math.floor((a>>>0)/(b>>>0))|0:(a>>>0)%(b>>>0)|0;}
    else if(c<27)r=c==24?a&b:c==25?a|b:a^b;
    else if(c<31)r=c==28?a<<(b&31):c==29?a>>(b&31):(a>>>(b&31))|0;
    else r=c==32?a==b?1:0:c==33?a<b?1:0:(a>>>0)<(b>>>0)?1:0;
    s-=2;D[s++]=r;
  }
 }
}
for(const d of readdirSync(I).sort()){
 const w=V(readFileSync(join(I,d,'program.bin')),readFileSync(join(I,d,'input.bin')));
 mkdirSync(join(O,d),{recursive:true});
 writeFileSync(join(O,d,'stdout.bin'),w[0]);
 writeFileSync(join(O,d,'exit.txt'),w[1]+'\n');
}
