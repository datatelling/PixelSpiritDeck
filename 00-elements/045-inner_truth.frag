// Title: Inner Truth
// Author: Patricio Gonzalez Vivo

#ifdef GL_ES
precision mediump float;
#endif

// Copyright (c) 2017 Patricio Gonzalez Vivo  - http://patriciogonzalezvivo.com/
// I am the sole copyright owner of this Work.
//
// You cannot host, display, distribute or share this Work in any form,
// including physical and digital. You cannot use this Work in any
// commercial or non-commercial product, website or project. You cannot
// sell this Work and you cannot mint an NFTs of it.
// I share this Work for educational purposes, and you can link to it,
// through an URL, proper attribution and unmodified screenshot, as part
// of your educational material. If these conditions are too restrictive
// please contact me and we'll definitely work it out.

uniform vec2 u_resolution;

#include "../lib/math.glsl"
#include "../lib/stroke.glsl"
#include "../lib/fill.glsl"
#include "../lib/rotate.glsl"
#include "../lib/rhombSDF.glsl"

void main() {
    vec3 color = vec3(0.);
    vec2 st = gl_FragCoord.xy/u_resolution;
    st = (st-.5)*1.1912+.5;
    st = mix(vec2((st.x*u_resolution.x/u_resolution.y)-(u_resolution.x*.5-u_resolution.y*.5)/u_resolution.y,st.y), 
             vec2(st.x,st.y*(u_resolution.y/u_resolution.x)-(u_resolution.y*.5-u_resolution.x*.5)/u_resolution.x), 
             step(u_resolution.x,u_resolution.y));
    st = (st-.5)*1.3+.5;
    //START
    st -= .5;
    float r = dot(st,st);
    float a = (atan(st.y,st.x)/PI);
    vec2 uv = vec2(a,r);
    vec2 grid = vec2(5.,log(r)*20.); 
    vec2 uv_i = floor(uv*grid);
    uv.x += .5*mod(uv_i.y,2.);
    vec2 uv_f = fract(uv*grid);
    float shape = rhombSDF(uv_f);
    color += fill(shape,.9)*
             step(.75,1.-r);
    //END
    gl_FragColor = vec4(color,1.);
}
