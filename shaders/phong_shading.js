export function createPhongShader(color) {
    function hexToVector3(hex) {
        var color = new THREE.Color(hex);
        return new THREE.Vector3(color.r, color.g, color.b);
    }

    var ambient = hexToVector3(color)
    var diffuse = hexToVector3(color);
    var specular = hexToVector3(0xffffff);

    var material = new THREE.ShaderMaterial({
        uniforms: {
            Ka: { value: ambient },
            Kd: { value: diffuse },
            Ks: { value: specular },
            LightIntensity: { value: new THREE.Vector4(0.8, 0.8, 0.8, 1.0) },
            LightPosition: { value: new THREE.Vector4(0.0, 2000.0, 0.0, 1.0) },
            Shininess: { value: 200.0 }
        },
        vertexShader: `
            varying vec3 Normal;
            varying vec3 Position;

            void main() {
                Normal = normalize(normalMatrix * normal);
                Position = vec3(modelViewMatrix * vec4(position, 1.0));
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            varying vec3 Normal;
            varying vec3 Position;

            uniform vec3 Ka;
            uniform vec3 Kd;
            uniform vec3 Ks;
            uniform vec3 LightPosition;
            uniform vec3 LightIntensity;
            uniform float Shininess;

            vec3 phong() {
                vec3 n = normalize(Normal);
                vec3 s = normalize(LightPosition - Position);
                vec3 v = normalize(-Position);
                vec3 r = reflect(-s, n);

                vec3 ambient = Ka;
                vec3 diffuse = Kd * max(dot(s, n), 0.0);
                vec3 specular = Ks * pow(max(dot(r, v), 0.0), Shininess);

                return LightIntensity * (ambient + diffuse + specular);
            }

            void main() {
                gl_FragColor = vec4(phong(), 1.0);
            }
        `,
        side: THREE.DoubleSide
    });

    return material;
};