precision mediump float;

// supplied by pixel
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform vec4 inputPixel;

// custom
uniform sampler2D tx1;
uniform sampler2D tx2;

void main ()
{
  // all have same size so you can use vTextureCoord
  vec4 color = texture2D(uSampler, vTextureCoord);
  vec4 ct1 = texture2D(tx2, vTextureCoord);
  vec4 ct2 = texture2D(tx1, vTextureCoord);

  // white color
  vec3 cur_color = vec3(1.0, 1.0, 1.0);

  color.rgb /= color.a;

  if (ct1.a > 0.1 && ct2.a > 0.1)
  {
    // intersection !!!
    // make it red
    cur_color.r = 1.0;
    cur_color.g = 0.0;
    cur_color.b = 0.0;
  }

  cur_color *= color.a;
  gl_FragColor = vec4(cur_color, color.a);
}
