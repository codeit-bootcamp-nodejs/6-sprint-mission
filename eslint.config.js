import globals from "globals";
  export default [
    { languageOptions: { globals: globals.node } },
    { rules: { "no-unused-vars": "warn", "no-undef": "error" } }
  ];
