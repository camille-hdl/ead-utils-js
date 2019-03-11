import babel from "rollup-plugin-babel";
import replace from "rollup-plugin-replace";
const outputDir = "./";


export default CLIArgs => {
    const bundle = {
        input: ["./index.js"],
        output: [
            {
                dir: outputDir + "cjs/",
                format: "cjs",
            },
            {
                dir: outputDir + "esm/",
                format: "es",
            },
        ],
        watch: {
            include: ["./src/**"],
        },
        plugins: [
            replace({
                "process.env.NODE_ENV": JSON.stringify("production"),
            }),
            babel({
                exclude: "node_modules/**",
            }),
        ]
    };
    return bundle;
};
