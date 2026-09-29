<?php

require_once "conexion.php";

$correo = isset($_POST["correo"]) ? trim($_POST["correo"]) : "";
$contrasena = isset($_POST["contrasena"]) ? $_POST["contrasena"] : "";

if ($correo === "" || $contrasena === "") {
    die("Por favor, completá todos los campos.");
}

if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
    die("El correo electrónico no es válido.");
}


/* BUSCAR SI EL USUARIO YA EXISTE */

$sql = "SELECT id, contraseña FROM usuarios WHERE correo = ?";

$stmt = $conexion->prepare($sql);
$stmt->bind_param("s", $correo);
$stmt->execute();

$stmt->store_result();


/* SI EXISTE */

if ($stmt->num_rows > 0) {

    $stmt->bind_result($id, $password_guardada);
    $stmt->fetch();

    if (password_verify($contrasena, $password_guardada)) {

        $titulo = "¡BIENVENIDX!";
        $mensaje = "Iniciaste sesión correctamente.";

    } else {

        $titulo = "CONTRASEÑA INCORRECTA";
        $mensaje = "La contraseña ingresada no coincide con tu cuenta.";

    }


/* SI NO EXISTE → CREAR USUARIO */

} else {

    $password_segura = password_hash($contrasena, PASSWORD_DEFAULT);

    $sql = "INSERT INTO usuarios (correo, contraseña) VALUES (?, ?)";

    $stmt2 = $conexion->prepare($sql);
    $stmt2->bind_param("ss", $correo, $password_segura);

    if ($stmt2->execute()) {

        $titulo = "¡BIENVENIDX A LA COMUNIDAD!";
        $mensaje = "Tu cuenta fue creada correctamente.";

    } else {

        $titulo = "ERROR";
        $mensaje = "No pudimos crear tu cuenta.";

    }
}

?>

<!DOCTYPE html>

<html lang="es">

<head>

    <meta charset="UTF-8">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Bauhaus | Comunidad</title>

    <link rel="preconnect" href="https://fonts.googleapis.com">

    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

    <link
        href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
    >

    <link rel="stylesheet" href="../css/style.css">

</head>

<body>

    <main class="resultado-login">

        <div class="resultado-rojo"></div>
        <div class="resultado-amarillo"></div>
        <div class="resultado-azul"></div>

        <section class="resultado-caja">

            <p class="resultado-label">
                BAUHAUS · COMUNIDAD
            </p>

            <h1>
                <?php echo $titulo; ?>
            </h1>

            <div class="resultado-linea"></div>

            <p class="resultado-mensaje">
                <?php echo $mensaje; ?>
            </p>

            <p class="resultado-correo">
                <?php echo htmlspecialchars($correo); ?>
            </p>

            <a href="login.html" class="resultado-boton">
                VOLVER →
            </a>

            <a href="../index.html" class="resultado-volver">
                VOLVER A LA BAUHAUS
            </a>

        </section>

    </main>

</body>

</html>