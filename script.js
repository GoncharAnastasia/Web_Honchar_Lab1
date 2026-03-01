console.log('Usage: triangle(value1, type1, value2, type2)');
console.log('Types: "leg", "hypotenuse", "adjacent angle", "opposite angle", "angle"');
console.log('Examples:');
console.log('  triangle(7, "leg", 18, "hypotenuse");');
console.log('  triangle(60, "opposite angle", 5, "leg");');
console.log('  triangle(30, "adjacent angle", 10, "leg");');
console.log('  triangle(43.13, "angle", 18, "hypotenuse");');

function triangle(value1, type1, value2, type2) {
  console.log("=== Triangle calculation started ===");

  function toRadians(deg) { return deg * Math.PI / 180; }
  function toDegrees(rad) { return rad * 180 / Math.PI; }

  function isFiniteNumber(x) {
    return typeof x === "number" && Number.isFinite(x);
  }

  function fail(msg) {
    console.log(msg);
    return "failed";
  }

  function printResult(a, b, c, alpha, beta) {
    console.log("a =", a);
    console.log("b =", b);
    console.log("c =", c);
    console.log("alpha =", alpha);
    console.log("beta =", beta);
  }

  const allowedTypes = new Set(["leg", "hypotenuse", "adjacent angle", "opposite angle", "angle"]);

  if (!allowedTypes.has(type1) || !allowedTypes.has(type2)) {
    return fail("Invalid type. Check spelling of types.");
  }

  if (!isFiniteNumber(value1) || !isFiniteNumber(value2)) {
    return fail("Values must be numbers.");
  }
  if (value1 <= 0 || value2 <= 0) {
    return fail("Zero or negative input");
  }

  let t1 = type1, v1 = value1;
  let t2 = type2, v2 = value2;

  let a, b, c, alpha, beta;

  if (t1 === "leg" && t2 === "leg") {
    a = v1;
    b = v2;
    c = Math.sqrt(a * a + b * b);
    alpha = toDegrees(Math.atan(a / b));
    beta = 90 - alpha;
  }

  else if (
    (t1 === "leg" && t2 === "hypotenuse") ||
    (t1 === "hypotenuse" && t2 === "leg")
  ) {
    if (t1 === "leg") { a = v1; c = v2; }
    else { a = v2; c = v1; }

    if (a >= c) return fail("Leg cannot be greater or equal than hypotenuse");

    b = Math.sqrt(c * c - a * a);
    alpha = toDegrees(Math.asin(a / c));
    beta = 90 - alpha;
  }

  else if (
    (t1 === "angle" && t2 === "hypotenuse") ||
    (t1 === "hypotenuse" && t2 === "angle")
  ) {
    if (t1 === "angle") { alpha = v1; c = v2; }
    else { alpha = v2; c = v1; }

    if (alpha <= 0 || alpha >= 90) return fail("Angle must be between 0 and 90");

    beta = 90 - alpha;

    const rad = toRadians(alpha);
    a = c * Math.sin(rad);
    b = c * Math.cos(rad);
  }

  
  else if (
    (t1 === "opposite angle" && t2 === "leg") ||
    (t1 === "leg" && t2 === "opposite angle")
  ) {
    let ang, leg;

    if (t1 === "opposite angle") { ang = v1; leg = v2; }
    else { ang = v2; leg = v1; }

    if (ang <= 0 || ang >= 90) return fail("Angle must be between 0 and 90");

    alpha = ang;         
    a = leg;              
    beta = 90 - alpha;

    const rad = toRadians(alpha);
    c = a / Math.sin(rad);
    b = a / Math.tan(rad);
  }

  
  else if (
    (t1 === "adjacent angle" && t2 === "leg") ||
    (t1 === "leg" && t2 === "adjacent angle")
  ) {
    let ang, leg;

    if (t1 === "adjacent angle") { ang = v1; leg = v2; }
    else { ang = v2; leg = v1; }

    if (ang <= 0 || ang >= 90) return fail("Angle must be between 0 and 90");

    alpha = ang;     
    a = leg;         
    beta = 90 - alpha;

    const rad = toRadians(alpha);
    c = a / Math.cos(rad);
    b = a * Math.tan(rad);
  }

  else {
    return fail("Invalid argument types (unsupported pair).");
  }

  if (!(a > 0 && b > 0 && c > 0)) return fail("Computation error: non-positive result");
  if (a >= c || b >= c) return fail("Computation error: legs must be smaller than hypotenuse");
  if (!(alpha > 0 && beta > 0 && Math.abs(alpha + beta - 90) < 1e-6)) {
    return fail("Computation error: angles invalid");
  }

  printResult(a, b, c, alpha, beta);
  return "success";
}