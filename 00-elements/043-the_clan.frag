// Title: The Elders
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
#include "../lib/rotate.glsl"
#include "../lib/vesicaSDF.glsl"
#include "../lib/bridge.glsl"

void main() {
    vec3 color = vec3(0.);
    vec2 st = gl_FragCoord.xy/u_resolution;
    st = (st-.5)*1.1912+.5;
    st = mix(vec2((st.x*u_resolution.x/u_resolution.y)-(u_resolution.x*.5-u_resolution.y*.5)/u_resolution.y,st.y), 
             vec2(st.x,st.y*(u_resolution.y/u_resolution.x)-(u_resolution.y*.5-u_resolution.x*.5)/u_resolution.x), 
             step(u_resolution.x,u_resolution.y));
    //START
    float n = 3.;
    float a = TAU/n;
    for (float i = 0.; i < n*2.; i++) {
        vec2 xy = rotate(st,a*i);
        xy.y -= .09;
        float vsc = vesicaSDF(xy,.3);
        color = mix(color + stroke(vsc,.5,.1),
                    mix(color,
                        bridge(color, vsc,.5,.1),
                        step(xy.x,.5)-step(xy.y,.4)),
                    step(3.,i));
    }
    //END
    gl_FragColor = vec4(color,1.);
}
