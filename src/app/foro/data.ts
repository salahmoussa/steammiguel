export interface Thread {
  id: string;
  title: string;
  author: string;
  content: string;
  replies: number;
  createdAt: string;
  sticky?: boolean;
}

export interface Reply {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}

export const DEFAULT_THREADS: Thread[] = [
  {
    id: "sticky",
    title: "SI DESAPAREZCO, LEED ESTO. NO ES UN LARP.",
    author: "throwaway_8847",
    content: "No voy a decir quien soy ni donde trabajo. Solo necesito que esto quede por escrito en algun sitio.\n\nLlevo meses metido en algo que se me ha ido de las manos. Empece sin saber lo que estaba haciendo y cuando me di cuenta ya era tarde para salirme. He visto cosas que no se pueden olvidar. Gente que ha desaparecido. Dinero que no deberia existir.\n\nLas personas con las que estoy creen que soy uno mas. No lo soy. Pero si me descubren, no llegare a manana.\n\nHace dos semanas la persona con la que mantenia contacto dejo de responder. He ido al punto donde quedabamos y no ha aparecido nadie. Cuando he intentado avisar por los canales oficiales, me han dicho que no existe ningun registro. Como si nunca hubiera pasado.\n\nMe han dejado tirado. O peor, alguien me ha vendido.\n\nAyer encontre algo debajo de mi coche que no deberia estar ahi. Saben donde vivo. Saben en que coche me muevo. Es cuestion de dias.\n\nHe guardado todo lo que tengo en un trastero alquilado. Una de esas naves industriales del norte, una empresa que alquila modulos por meses. No me acuerdo bien del nombre, llevo demasiado tiempo sin dormir, era algo con \"Storage\" o \"Almacenes\" o algo asi. Esta en el poligono de Murrieta Heights, cerca de las vias. La unica de la zona que tiene la fachada azul.\n\nSi dejo de postear ya sabeis lo que ha pasado. No me busqueis. No preguntéis. Solo recordad que esto era real.",
    replies: 20,
    createdAt: "2026-02-18T03:12:00.000Z",
    sticky: true,
  },
  {
    id: "1",
    title: "Me han vuelto a robar el Futo en Strawberry",
    author: "carlos_rp94",
    content: "Tercer Futo que me roban este mes hermano. Lo deje aparcado en la puerta del 24/7 de Strawberry, entre a comprar un eCola y cuando salgo ya no estaba. Ni 2 minutos.\n\nAlguien sabe si hay algun seguro que cubra esto? Porque el de Dynasty8 me dice que sin LoJack no cubren nada y el LoJack vale mas que el coche.\n\nEstoy hasta los huevos ya.",
    replies: 8,
    createdAt: "2026-03-15T10:00:00.000Z",
  },
  {
    id: "2",
    title: "Alguien ha comido en el nuevo puesto de tacos de Vespucci?",
    author: "LaGordita_LS",
    content: "El que esta en el paseo maritimo cerca del muscle beach. Fui ayer con mi prima y pedimos unos tacos al pastor que estaban INCREIBLES. El tio que los hace se llama Ramon y es un crack.\n\nLo unico malo es que no tiene mesas, comes de pie o sentada en la arena. Pero por 8 dolares comes hasta reventar.\n\nRecomendadisimo si andais por la zona.",
    replies: 8,
    createdAt: "2026-03-17T13:20:00.000Z",
  },
  {
    id: "3",
    title: "Busco roommate para piso en Mirror Park",
    author: "tommy_flats",
    content: "Me acabo de mudar a Mirror Park y el alquiler me esta matando. Busco alguien para compartir piso.\n\n- 2 habitaciones, 1 bano\n- Cerca de la gasolinera y el lago\n- 750$/mes cada uno (luz y agua incluidos)\n- No fumar dentro, fuera en el balcon si quieres\n- Tengo un gato, si eres alergico pues mala suerte\n\nSoy tranquilo, trabajo de noche en el Vanilla Unicorn (de barman, no me mireis raro). Mandadme DM.",
    replies: 7,
    createdAt: "2026-03-19T09:45:00.000Z",
  },
  {
    id: "4",
    title: "El Up-n-Atom de Paleto es el peor restaurante de todo el condado",
    author: "paleto_boy",
    content: "No se quien gestiona esa mierda de franquicia pero las hamburguesas saben a carton mojado. Ayer pedi un menu doble y la carne estaba cruda por dentro. CRUDA. Le dije al chaval de la caja y me dijo \"es el punto del chef\". Que chef hijo mio si esto es comida rapida.\n\nEncima el batido sabia a agua con colorante.\n\nNo vayais. Mejor ir al Cluckin Bell de la autopista que por lo menos el pollo esta caliente.",
    replies: 10,
    createdAt: "2026-03-21T17:30:00.000Z",
  },
  {
    id: "5",
    title: "Vendo Sultan RS tuneado, solo gente seria",
    author: "el_mecanico_jay",
    content: "Vendo mi Sultan RS porque necesito pasta para un tema personal.\n\n- Color negro mate con pegatinas racing\n- Turbo instalado en el LSC de Burton\n- Escape deportivo, suspension baja\n- 87.000 km, motor va como la seda\n- ITV pasada hace 2 meses\n\nPido 38.000$ negociables pero no me vengais con ofertas ridiculas tipo 15.000 que me lo quedo antes.\n\nSe puede ver en el parking del Maze Bank Arena cualquier tarde.",
    replies: 8,
    createdAt: "2026-03-23T11:15:00.000Z",
  },
  {
    id: "6",
    title: "Consejos para pescar en el muelle de Del Perro?",
    author: "fisherman_luis",
    content: "Me compre una cana de pescar y quiero probar en el muelle de Del Perro pero no tengo ni idea. Alguno que pesque por ahi me puede decir:\n\n- Que cebo usar?\n- A que hora se pilla mas?\n- Hace falta licencia o paso?\n- Hay algun sitio donde comprar cebo cerca?\n\nEs para relajarme los domingos, que entre el trabajo y el trafico de esta ciudad me va a dar algo.",
    replies: 9,
    createdAt: "2026-03-25T08:00:00.000Z",
  },
  {
    id: "7",
    title: "Alerta: radares nuevos en la autopista hacia Paleto",
    author: "nocturno_ls",
    content: "Aviso para los que haceis la ruta de LS a Paleto Bay por la Great Ocean Highway. Han puesto 3 radares nuevos:\n\n1. Justo despues de la curva del tunel de Chumash\n2. En la recta larga antes de llegar a la gasolinera de la costa\n3. A la entrada de Paleto, donde el cartel de bienvenida\n\nA mi ya me han pillado a 140 en la recta. 800 dolares de multa. Avisados quedais.",
    replies: 9,
    createdAt: "2026-03-27T22:10:00.000Z",
  },
  {
    id: "8",
    title: "Se escuchan disparos TODAS las noches en Chamberlain Hills",
    author: "vecina_harta",
    content: "Ya no se puede vivir aqui. Llevo un mes sin dormir bien porque cada noche sobre las 2-3am se escuchan tiros. A veces duran 5 minutos, a veces media hora.\n\nHe llamado al LSPD 4 veces y siempre me dicen lo mismo: \"estamos al tanto de la situacion\". Pues no parece.\n\nAlguien del barrio que me diga si sabe que esta pasando? Estoy pensando en mudarme pero no tengo para el deposito de otro piso.",
    replies: 11,
    createdAt: "2026-03-28T01:30:00.000Z",
  },
  {
    id: "9",
    title: "El gym de Vespucci ha subido la cuota a 120$/mes",
    author: "fit_mike",
    content: "Me acabo de enterar que el gym de muscle beach ha subido de 80 a 120 dolares al mes. Sin aviso, sin mejoras, sin nada. Los mismos hierros oxidados de siempre y las duchas que salen agua fria la mitad del tiempo.\n\nAlguien conoce otro gym por la zona que no sea un robo? He oido que hay uno nuevo por La Mesa pero no se si es buen precio.",
    replies: 9,
    createdAt: "2026-03-29T15:45:00.000Z",
  },
  {
    id: "10",
    title: "Primer dia trabajando de taxista, que locura",
    author: "nuevo_en_ls",
    content: "Acabo de llegar a Los Santos hace una semana y hoy fue mi primer dia como taxista con Downtown Cab Co.\n\nResumen del dia:\n- Un tio me hizo esperar 20 minutos y luego se bajo sin pagar\n- Una senora me pidio que la llevara a Paleto Bay (1 hora de viaje) y me dio 5 dolares de propina\n- Casi me choco un Zentorno que iba a 200 por Vinewood Blvd\n- Un borracho me vomito en el asiento de atras\n\nPero bueno, saque 340 dolares limpios asi que no me quejo del todo. Manana mas.",
    replies: 10,
    createdAt: "2026-03-30T20:00:00.000Z",
  },
  {
    id: "11",
    title: "Alguien sabe que es MazeVault??",
    author: "Anonymous",
    content: "No voy a dar muchos detalles pero he encontrado unas credenciales de acceso a algo que se llama MazeVault. No lo busqueis en Google porque no sale nada. NADA. Es como si no existiera.\n\nHe conseguido entrar y parece una especie de wallet o plataforma de fondos. Hay movimientos, cantidades, codigos de transferencia. No entiendo la mitad de lo que veo pero las cantidades son grandes. Muy grandes.\n\nAlguien ha oido hablar de esto? No se si deberia estar viendo lo que estoy viendo y me estoy empezando a poner nervioso.",
    replies: 4,
    createdAt: "2026-03-31T02:15:00.000Z",
  },
];

export const DEFAULT_REPLIES: Record<string, Reply[]> = {
  "sticky": [
    { id: "rsa", author: "Anonymous", content: ">postea a las 3am\n>no da nombres\n>no da pruebas\n\nlarp del mes confirmado", createdAt: "2026-02-18T03:25:00.000Z" },
    { id: "rsb", author: "throwaway_8847", content: ">>rsa\nMe da igual que no me creas. Esto no es para ti. Es para que quede constancia por si me pasa algo.", createdAt: "2026-02-18T03:31:00.000Z" },
    { id: "rsc", author: "nocturno_ls", content: "Tio si esto es verdad por que coño lo publicas AQUI y no vas a un periodista o algo? Weazel News, lo que sea.", createdAt: "2026-02-18T03:40:00.000Z" },
    { id: "rsd", author: "throwaway_8847", content: ">>rsc\nPorque la gente con la que estoy tiene contactos en todas partes. Periodicos, ayuntamiento, la propia policia. No puedo confiar en nadie. Al menos esto es anonimo.", createdAt: "2026-02-18T03:47:00.000Z" },
    { id: "rse", author: "Anonymous", content: "Si es verdad, da algun detalle que se pueda verificar. Una matricula, un sitio, lo que sea. Sino esto no vale nada.", createdAt: "2026-02-18T04:05:00.000Z" },
    { id: "rsf", author: "carlos_rp94", content: "Larp de manual. Todos los meses sale uno de estos. La semana pasada uno decia que era piloto de Merryweather y que habia visto ovnis en Chiliad.", createdAt: "2026-02-18T06:30:00.000Z" },
    { id: "rsg", author: "Anonymous", content: "Lo del aparato debajo del coche es un detalle muy especifico para ser inventado. Y lo del contacto que no responde... eso pasa mas de lo que la gente cree. Conozco casos.", createdAt: "2026-02-18T08:15:00.000Z" },
    { id: "rsh", author: "throwaway_8847", content: "Actualizacion: esta manana habia un Cavalcade negro aparcado en mi calle que no es de ningun vecino. Lleva ahi desde las 6am. No se ha movido. Tiene los cristales tintados.\n\nNo voy a postear mucho mas. Solo queria que esto quedara escrito.", createdAt: "2026-02-18T10:22:00.000Z" },
    { id: "rsi", author: "tommy_flats", content: "Tio si de verdad hay un Cavalcade vigilandote SAL DE TU CASA. Vete a un motel, paga en efectivo, no uses el movil. Esto es sentido comun.", createdAt: "2026-02-18T10:40:00.000Z" },
    { id: "rsj", author: "Anonymous", content: "Si esto es real acabas de firmar tu sentencia de muerte publicandolo aqui, lo sabes no? Da igual que sea anonimo. Si ellos leen esto van a saber exactamente quien eres.", createdAt: "2026-02-18T11:30:00.000Z" },
    { id: "rsk", author: "throwaway_8847", content: ">>rsj\nYa lo se. Por eso lo publico. Si me pasa algo quiero que alguien sepa que no fue un accidente ni un suicidio.\n\nSi escuchais cualquier noticia rara estos dias, ya sabeis la verdad.", createdAt: "2026-02-18T11:45:00.000Z" },
    { id: "rsl", author: "paleto_boy", content: "Madre mia este hilo. No se si es real o no pero me estoy cagando encima leyendolo.", createdAt: "2026-02-18T13:00:00.000Z" },
    { id: "rsm", author: "Anonymous", content: "Han pasado 8 horas desde el ultimo post de OP. Alguien sabe algo?", createdAt: "2026-02-18T20:00:00.000Z" },
    { id: "rsn", author: "Anonymous", content: "Acabo de buscar en las noticias de Weazel. Ayer por la noche encontraron el cuerpo de un hombre con un disparo en la cabeza en un callejon de La Mesa. \"La policia investiga las circunstancias del fallecimiento.\" No dan nombre.\n\nNo estoy diciendo que sea OP. Pero el timing...", createdAt: "2026-02-19T09:30:00.000Z" },
    { id: "rso", author: "carlos_rp94", content: ">>rsn\nJoder. Joder joder joder. Puede ser coincidencia... verdad?", createdAt: "2026-02-19T09:45:00.000Z" },
    { id: "rsp", author: "Anonymous", content: "OP no ha vuelto a postear. Llevamos 24 horas.\n\nAlguien sabe que naves de alquiler hay por Murrieta Heights con la fachada azul? He pasado por la zona y hay como 4 o 5 empresas distintas, no se cual sera.", createdAt: "2026-02-19T11:00:00.000Z" },
    { id: "rsq", author: "nocturno_ls", content: ">>rsp\nYo trabaje cerca de esa zona. Hay varias pero la de fachada azul que recuerdo era una que alquilaba trasteros y boxes por meses. Llevaba ahi anos. No me acuerdo del nombre exacto pero era algo basico, muy industrial. Si alguien tiene mas huevos que yo que vaya a mirar.", createdAt: "2026-02-19T14:20:00.000Z" },
    { id: "rsr", author: "Anonymous", content: "Este hilo deberia ser sticky permanente. Tanto si es real como si no, es lo mas heavy que se ha publicado en 5chan.", createdAt: "2026-02-19T16:00:00.000Z" },
    { id: "rss", author: "Anonymous", content: "Weazel News acaba de publicar una nota corta: \"Hombre encontrado fallecido en La Mesa. Identidad pendiente de confirmacion.\" Sin nombre, sin fotos, sin detalles. Raro.\n\nRIP throwaway_8847. Quien quiera que fueras.", createdAt: "2026-02-20T08:15:00.000Z" },
    { id: "rst", author: "tommy_flats", content: "Descansa en paz hermano. Esperemos que lo que dejaste aparezca algun dia.", createdAt: "2026-02-20T09:00:00.000Z" },
  ],
  "1": [
    { id: "r1a", author: "el_mecanico_jay", content: "Hermano ponle un LoJack de los chinos que venden en el mercadillo de La Mesa, cuestan 200$ y funcionan igual.", createdAt: "2026-03-15T11:20:00.000Z" },
    { id: "r1b", author: "Anonymous", content: ">aparcar en Strawberry\n>esperar que no te roben\n\nelige uno", createdAt: "2026-03-15T11:45:00.000Z" },
    { id: "r1c", author: "carlos_rp94", content: ">>r1b\nYa lo se tio pero es que vivo ahi, donde quieres que aparque??", createdAt: "2026-03-15T12:00:00.000Z" },
    { id: "r1d", author: "tommy_flats", content: "A mi me robaron un Blista la semana pasada en Forum Drive. No habian pasado ni 30 segundos. Vi al chaval salir corriendo, meterse y arrancarlo. Me quede ahi de pie como un subnormal.", createdAt: "2026-03-15T12:30:00.000Z" },
    { id: "r1e", author: "Anonymous", content: "Yo ya directamente compro coches de mierda que no le importan a nadie. Tengo un Ratloader que lleva 4 meses en la calle y ni lo tocan. Nadie quiere esa basura lmao", createdAt: "2026-03-15T13:15:00.000Z" },
    { id: "r1f", author: "nocturno_ls", content: "Protip: aparca siempre de culo contra la pared asi no pueden hacerle puente tan facil. No es infalible pero ayuda.", createdAt: "2026-03-15T14:00:00.000Z" },
    { id: "r1g", author: "carlos_rp94", content: ">>r1e\nEl tema es que me gusta el Futo, no voy a conducir un Ratloader solo para que no me lo roben. Prefiero llorar.", createdAt: "2026-03-15T14:30:00.000Z" },
    { id: "r1h", author: "vecina_harta", content: "En Chamberlain Hills ni te cuento. A mi vecino le robaron la moto DENTRO del garaje. Forzaron la puerta y todo.", createdAt: "2026-03-15T15:00:00.000Z" },
  ],
  "2": [
    { id: "r2a", author: "fit_mike", content: "Los tacos de Ramon son god tier. Voy todos los viernes despues del gym.", createdAt: "2026-03-17T14:00:00.000Z" },
    { id: "r2b", author: "paleto_boy", content: "A ver si sube alguien a Paleto a poner un puesto de esos porque aqui lo unico que hay es el Up-n-Atom de mierda.", createdAt: "2026-03-17T14:30:00.000Z" },
    { id: "r2c", author: "Anonymous", content: "El ceviche que hace tambien esta brutal, preguntadle por el porque no lo tiene en el menu pero lo hace si se lo pides.", createdAt: "2026-03-17T15:10:00.000Z" },
    { id: "r2d", author: "LaGordita_LS", content: ">>r2c\nNo sabia lo del ceviche!! Voy a probarlo este finde seguro", createdAt: "2026-03-17T16:00:00.000Z" },
    { id: "r2e", author: "nuevo_en_ls", content: "Acabo de llegar a la ciudad y esto es exactamente lo que necesitaba. Gracias por el dato!", createdAt: "2026-03-18T09:00:00.000Z" },
    { id: "r2f", author: "el_mecanico_jay", content: "Ramon es primo de un colega mio. Antes tenia un restaurante en El Burro Heights pero le quemaron el local. Ahora va con el carrito pero cocina igual de bien.", createdAt: "2026-03-18T10:30:00.000Z" },
    { id: "r2g", author: "Anonymous", content: ">8 dolares por comer hasta reventar\n>en Vespucci\n\neso es practicamente gratis para la zona. Cualquier mierda en el paseo te cobra 20 por un sandwich.", createdAt: "2026-03-18T12:00:00.000Z" },
    { id: "r2h", author: "tommy_flats", content: "Fui hoy gracias a este hilo. Pedi los de carnitas. Estoy llorando de lo buenos que estaban. Gracias OP, te debo una.", createdAt: "2026-03-19T14:00:00.000Z" },
  ],
  "3": [
    { id: "r3a", author: "Anonymous", content: ">trabaja en el Vanilla Unicorn\n>\"de barman\"\n\nseguro seguro?", createdAt: "2026-03-19T10:30:00.000Z" },
    { id: "r3b", author: "tommy_flats", content: ">>r3a\nSi tio, de barman. Que pasa, alguien tiene que servir las copas no?", createdAt: "2026-03-19T10:45:00.000Z" },
    { id: "r3c", author: "LaGordita_LS", content: "Mirror Park esta bastante bien para el precio. Yo vivia ahi antes de mudarme a Vespucci. Lo unico malo es que el lago por la noche da un poco de mal rollo, hay gente rara.", createdAt: "2026-03-19T11:00:00.000Z" },
    { id: "r3d", author: "carlos_rp94", content: "750 con todo incluido es buen precio. Yo pago 900 por un estudio en Strawberry y ni tiene balcon.", createdAt: "2026-03-19T12:00:00.000Z" },
    { id: "r3e", author: "Anonymous", content: "Como se llama el gato? Es importante para tomar la decision.", createdAt: "2026-03-19T13:00:00.000Z" },
    { id: "r3f", author: "tommy_flats", content: ">>r3e\nSe llama Bigotes. Es naranja y gordo. No molesta, solo duerme y come.", createdAt: "2026-03-19T13:15:00.000Z" },
    { id: "r3g", author: "fit_mike", content: "Tio te escribi DM. Estoy buscando algo asi, mi contrato actual termina el mes que viene.", createdAt: "2026-03-19T15:00:00.000Z" },
  ],
  "4": [
    { id: "r4a", author: "Anonymous", content: ">ir al Up-n-Atom\n>pedir comida\n>esperar que este buena\n\nese fue tu primer error", createdAt: "2026-03-21T18:00:00.000Z" },
    { id: "r4b", author: "LaGordita_LS", content: "El Cluckin Bell de la autopista tampoco es que sea una maravilla eh. El otro dia encontre un pelo en las alitas.", createdAt: "2026-03-21T18:30:00.000Z" },
    { id: "r4c", author: "carlos_rp94", content: "El unico sitio decente para comer en Paleto es la pizzeria que hay al lado de la comisaria. El resto es basura.", createdAt: "2026-03-21T19:00:00.000Z" },
    { id: "r4d", author: "paleto_boy", content: ">>r4c\nLa pizzeria cerro hace 2 semanas bro, el tio se mudo a Sandy Shores", createdAt: "2026-03-21T19:15:00.000Z" },
    { id: "r4e", author: "Anonymous", content: "Paleto Bay es un agujero, mudense a la ciudad y dejen de quejarse", createdAt: "2026-03-21T20:00:00.000Z" },
    { id: "r4f", author: "paleto_boy", content: ">>r4e\nNo todos podemos pagar 3000$ de alquiler en Vinewood, genio", createdAt: "2026-03-21T20:10:00.000Z" },
    { id: "r4g", author: "fisherman_luis", content: "En Paleto lo mejor es comprar en el supermercado y cocinar en casa. Yo me hago unos pescados que flipas.", createdAt: "2026-03-22T08:00:00.000Z" },
    { id: "r4h", author: "tommy_flats", content: "Mirror Park gang. Alquiler barato y hay un Cluckin Bell decente a 5 minutos.", createdAt: "2026-03-22T10:00:00.000Z" },
    { id: "r4i", author: "Anonymous", content: "Yo una vez pedi un batido de fresa en ese Up-n-Atom y me dieron uno de vainilla con colorante rosa. Se lo dije al chaval y me dijo \"es lo mismo\". No es lo mismo, Kevin.", createdAt: "2026-03-22T11:30:00.000Z" },
    { id: "r4j", author: "paleto_boy", content: ">>r4i\nJAJAJAJA te juro que ese Kevin trabaja ahi desde que tengo memoria. No le importa nada.", createdAt: "2026-03-22T12:00:00.000Z" },
  ],
  "5": [
    { id: "r5a", author: "carlos_rp94", content: "38k por un Sultan RS con 87.000km? Estas loco o fumado? Por 38k me compro uno nuevo en el concesionario.", createdAt: "2026-03-23T12:00:00.000Z" },
    { id: "r5b", author: "el_mecanico_jay", content: ">>r5a\nNuevo sin tunear. Este tiene turbo, escape, suspension, pegatinas. Solo el turbo ya vale 8.000 en el LSC de Burton.", createdAt: "2026-03-23T12:20:00.000Z" },
    { id: "r5c", author: "Anonymous", content: "\"necesito pasta para un tema personal\"\n\n>le debe dinero a alguien\n>va a salir corriendo de la ciudad\n\nelige uno", createdAt: "2026-03-23T13:00:00.000Z" },
    { id: "r5d", author: "el_mecanico_jay", content: ">>r5c\nEs para una operacion de mi vieja pero gracias por suponer lo peor, tipico de este foro", createdAt: "2026-03-23T13:15:00.000Z" },
    { id: "r5e", author: "nocturno_ls", content: "Puedo ir a verlo el jueves por la tarde? Si esta bien de motor te hago oferta seria.", createdAt: "2026-03-23T14:00:00.000Z" },
    { id: "r5f", author: "el_mecanico_jay", content: ">>r5e\nDale, jueves a las 18h en el parking del Maze Bank Arena. Pregunta por Jay.", createdAt: "2026-03-23T14:10:00.000Z" },
    { id: "r5g", author: "Anonymous", content: "\"ITV pasada hace 2 meses\"\n\nbro en Los Santos nadie pasa la ITV lmao que es esto, Europa?", createdAt: "2026-03-23T15:00:00.000Z" },
    { id: "r5h", author: "fit_mike", content: "Yo tuve un Sultan RS negro mate tambien. Es un cochazo. Si no necesitara la pasta yo no lo venderia.", createdAt: "2026-03-23T16:00:00.000Z" },
  ],
  "6": [
    { id: "r6a", author: "paleto_boy", content: "Yo pesco en Paleto Bay todos los fines de semana. El muelle de Del Perro es un poco mierda para pescar la verdad, mucho turista y mucho ruido. Pero si quieres probarlo, usa gusanos como cebo.", createdAt: "2026-03-25T09:00:00.000Z" },
    { id: "r6b", author: "Anonymous", content: ">pescar en Del Perro\n>donde los hippies se banan desnudos a las 6am\n\nque vas a pescar ahi, hepatitis?", createdAt: "2026-03-25T09:30:00.000Z" },
    { id: "r6c", author: "fisherman_luis", content: ">>r6b\nJoder tio solo quiero relajarme un rato, dejadme en paz lmao", createdAt: "2026-03-25T09:45:00.000Z" },
    { id: "r6d", author: "LaGordita_LS", content: "Mi abuelo pescaba en el muelle y pillaba corvinas bastante decentes. Dice que lo mejor es ir a las 5-6 de la manana antes de que llegue la gente. Licencia creo que si hace falta, la puedes sacar en la tienda de pesca de la costa.", createdAt: "2026-03-25T10:30:00.000Z" },
    { id: "r6e", author: "tommy_flats", content: "En la tienda de cebos del puerto de LS venden de todo. Se llama \"Bait Shop\" o algo asi, esta al lado del embarcadero grande.", createdAt: "2026-03-25T11:00:00.000Z" },
    { id: "r6f", author: "paleto_boy", content: "Si de verdad quieres pescar bien venite a Paleto algun dia. Aqui se pillan truchas enormes en el rio Cassidy. Y no hay ni un alma, es otro nivel.", createdAt: "2026-03-25T12:00:00.000Z" },
    { id: "r6g", author: "fisherman_luis", content: ">>r6f\nMe apunto, pero esta lejos para ir cada domingo. Un dia de estos organizo una excursion.", createdAt: "2026-03-25T12:30:00.000Z" },
    { id: "r6h", author: "Anonymous", content: "Imagina vivir en Los Santos, la ciudad del vicio, y tu hobbie es PESCAR. Respect.", createdAt: "2026-03-25T14:00:00.000Z" },
    { id: "r6i", author: "nuevo_en_ls", content: "Yo tambien quiero probar! Si organizas la excursion a Paleto avisadme.", createdAt: "2026-03-26T08:00:00.000Z" },
  ],
  "7": [
    { id: "r7a", author: "el_mecanico_jay", content: "Confirmo, a mi me pillaron ayer a 120 en la curva de Chumash. 600 pavos a la basura.", createdAt: "2026-03-28T00:00:00.000Z" },
    { id: "r7b", author: "Anonymous", content: "Gracias por el aviso, hago esa ruta todos los dias para ir a trabajar.", createdAt: "2026-03-28T06:30:00.000Z" },
    { id: "r7c", author: "carlos_rp94", content: "Usa Waze de Los Santos, ahi salen todos los radares actualizados", createdAt: "2026-03-28T07:00:00.000Z" },
    { id: "r7d", author: "nocturno_ls", content: ">>r7c\nWaze no tiene los nuevos todavia, tarda unos dias en que la gente los reporte", createdAt: "2026-03-28T08:00:00.000Z" },
    { id: "r7e", author: "Anonymous", content: ">ir a 140 por una carretera de costa\n>sorprenderse de que te multen\n\nlol", createdAt: "2026-03-28T09:00:00.000Z" },
    { id: "r7f", author: "paleto_boy", content: "Los de Paleto ya sabiamos de los radares, llevan ahi desde la semana pasada. Los de la ciudad siempre se enteran tarde.", createdAt: "2026-03-28T10:00:00.000Z" },
    { id: "r7g", author: "tommy_flats", content: "800 dolares de multa es una locura. Eso es lo que pago de alquiler al mes casi. Este estado es un robo.", createdAt: "2026-03-28T11:00:00.000Z" },
    { id: "r7h", author: "Anonymous", content: "Truco: si ves el flash del radar, para y da la vuelta. La foto no es valida si no se ve la matricula de frente. No me pregunteis como lo se.", createdAt: "2026-03-28T13:00:00.000Z" },
    { id: "r7i", author: "nocturno_ls", content: ">>r7h\nEso no funciona si tienen camara doble, que es lo que estan poniendo ahora. Graban delantera y trasera.", createdAt: "2026-03-28T13:30:00.000Z" },
  ],
  "8": [
    { id: "r8a", author: "Anonymous", content: "Yo vivo en Davis y es lo mismo. Es lo que hay.", createdAt: "2026-03-28T02:00:00.000Z" },
    { id: "r8b", author: "Anonymous", content: "La policia no va a entrar ahi de noche ni de broma, lo sabes verdad?", createdAt: "2026-03-28T02:30:00.000Z" },
    { id: "r8c", author: "tommy_flats", content: "Mirror Park esta tranquilo si buscas mudarte. 750 con roommate.", createdAt: "2026-03-28T08:00:00.000Z" },
    { id: "r8d", author: "vecina_harta", content: ">>r8c\nGracias, lo voy a mirar. Cualquier cosa es mejor que esto.", createdAt: "2026-03-28T09:00:00.000Z" },
    { id: "r8e", author: "Anonymous", content: ">vivir en Chamberlain Hills\n>quejarse de tiros\n\nes como vivir al lado del aeropuerto y quejarse del ruido", createdAt: "2026-03-28T10:00:00.000Z" },
    { id: "r8f", author: "vecina_harta", content: ">>r8e\nNo todos elegimos donde nacer, imbecil", createdAt: "2026-03-28T10:15:00.000Z" },
    { id: "r8g", author: "carlos_rp94", content: "Es por la guerra de bandas que hay ahora. Llevan semanas asi. Yo que tu me mudaba cuanto antes.", createdAt: "2026-03-28T11:00:00.000Z" },
    { id: "r8h", author: "Anonymous", content: "Alguien que llame a Merryweather a ver si ellos si hacen algo lmao", createdAt: "2026-03-28T12:00:00.000Z" },
    { id: "r8i", author: "fisherman_luis", content: "Venite a Del Perro, aqui lo mas fuerte que se escucha de noche son las gaviotas.", createdAt: "2026-03-28T14:00:00.000Z" },
    { id: "r8j", author: "fit_mike", content: "Del Perro esta bien pero el alquiler se ha ido por las nubes ultimamente.", createdAt: "2026-03-28T15:00:00.000Z" },
    { id: "r8k", author: "nuevo_en_ls", content: "Yo llegue hace una semana y me dijeron que no me acercara a Chamberlain de noche. Ahora entiendo por que.", createdAt: "2026-03-28T16:00:00.000Z" },
  ],
  "9": [
    { id: "r9a", author: "Anonymous", content: "120 dolares por usar hierros oxidados al aire libre. Ese gym es un chiste.", createdAt: "2026-03-29T16:00:00.000Z" },
    { id: "r9b", author: "carlos_rp94", content: "El de La Mesa se llama Iron Body Gym. Yo voy ahi, pago 60 al mes y tiene todo lo basico. No es bonito pero cumple.", createdAt: "2026-03-29T16:30:00.000Z" },
    { id: "r9c", author: "fit_mike", content: ">>r9b\n60?? Me estas jodiendo. Me cambio manana mismo. Tienen duchas decentes?", createdAt: "2026-03-29T16:45:00.000Z" },
    { id: "r9d", author: "carlos_rp94", content: ">>r9c\nSi, agua caliente y todo. Lo unico es que el vestuario es pequeno y a veces huele raro. Pero por 60 pues tampoco pidas el Ritz.", createdAt: "2026-03-29T17:00:00.000Z" },
    { id: "r9e", author: "Anonymous", content: ">pagar por un gym\n>cuando puedes hacer flexiones y correr gratis\n\nngmi", createdAt: "2026-03-29T17:30:00.000Z" },
    { id: "r9f", author: "fit_mike", content: ">>r9e\nA ver ven a decirme eso a la cara con tus bracitos de correr por la playa", createdAt: "2026-03-29T17:45:00.000Z" },
    { id: "r9g", author: "LaGordita_LS", content: "Yo iba al de Vespucci cuando costaba 50. Cuando subio a 80 ya me fui. 120 es directamente una estafa. Ni que tuviera piscina.", createdAt: "2026-03-29T18:30:00.000Z" },
    { id: "r9h", author: "tommy_flats", content: "En el parque de Mirror Park hay unas barras de calistenia gratis. No es lo mismo que un gym pero para mantenerse esta bien.", createdAt: "2026-03-29T19:00:00.000Z" },
    { id: "r9i", author: "Anonymous", content: "El dueno del gym de Vespucci es un ruso que tiene un Lamborghini. Eso os dice todo lo que necesitais saber sobre los precios.", createdAt: "2026-03-29T20:00:00.000Z" },
  ],
  "10": [
    { id: "r10a", author: "carlos_rp94", content: "Lo del borracho vomitando es un clasico. Bienvenido a LS hermano.", createdAt: "2026-03-30T20:30:00.000Z" },
    { id: "r10b", author: "Anonymous", content: "340 dolares en un dia? Yo trabajando en el Burger Shot saco 200 si tengo suerte. Me voy a meter de taxista.", createdAt: "2026-03-30T21:00:00.000Z" },
    { id: "r10c", author: "el_mecanico_jay", content: "Tip: no recojas a nadie en la puerta de los clubs despues de las 3am. De nada.", createdAt: "2026-03-30T21:30:00.000Z" },
    { id: "r10d", author: "LaGordita_LS", content: "El Zentorno a 200 por Vinewood es el dia a dia aqui jajaja. Ya te acostumbraras.", createdAt: "2026-03-30T22:00:00.000Z" },
    { id: "r10e", author: "nuevo_en_ls", content: ">>r10c\nApuntado. Hoy casi me apunalan asi que cualquier consejo es bienvenido lol", createdAt: "2026-03-31T08:00:00.000Z" },
    { id: "r10f", author: "nocturno_ls", content: "Yo fui taxista 6 meses. Lo deje cuando un tio me saco una pistola para no pagar. Ten cuidado de verdad.", createdAt: "2026-03-31T10:00:00.000Z" },
    { id: "r10g", author: "Anonymous", content: ">trabajar de taxista en Los Santos\n>esperar que no te pase nada\n\nsuerte con eso", createdAt: "2026-03-31T11:00:00.000Z" },
    { id: "r10h", author: "fisherman_luis", content: "Mi primo trabaja en Downtown Cab Co. Dice que el truco es quedarse por Vinewood y Rockford Hills. Los clientes de ahi pagan bien y no dan problemas. Evita el sur a toda costa.", createdAt: "2026-03-31T12:00:00.000Z" },
    { id: "r10i", author: "nuevo_en_ls", content: ">>r10h\nGracias! Hoy me quede por el centro y fue mucho mejor. Saque 410$ y nadie me vomito encima. Progreso.", createdAt: "2026-03-31T18:00:00.000Z" },
    { id: "r10j", author: "Anonymous", content: "Espera a que te toque llevar a alguien al aeropuerto. 45 minutos en el trafico de la autopista para que te den 15 dolares. Experiencia taxista completa.", createdAt: "2026-03-31T19:00:00.000Z" },
  ],
  "11": [
    { id: "r11a", author: "Anonymous", content: "Suena a crypto scam de manual. \"Plataforma exclusiva\", \"no sale en Google\", \"cantidades grandes\"... Hermano te van a vaciar la cuenta.", createdAt: "2026-03-31T02:40:00.000Z" },
    { id: "r11b", author: "nocturno_ls", content: "No es crypto. Yo he oido hablar de MazeVault una vez, en un foro de deep web. Es una plataforma de custodia de fondos. No me preguntes mas. Borra este hilo y olvida lo que has visto.", createdAt: "2026-03-31T03:05:00.000Z" },
    { id: "r11c", author: "Anonymous", content: ">encontre unas credenciales\n>entre a una plataforma desconocida\n>hay cantidades muy grandes\n\ntio que has hecho. Si eso es lo que creo que es no deberias haber tocado nada. Esas plataformas registran cada login, IP, todo. Ya saben que entraste.", createdAt: "2026-03-31T03:30:00.000Z" },
    { id: "r11d", author: "Anonymous", content: "Conozco a alguien que trabajaba en una empresa de contabilidad en el centro. Le despidieron de la noche a la manana y me conto que algunos clientes movian pasta a traves de algo que se llamaba MV o Maze algo. Dijo que era todo legal sobre el papel pero que olia raro. No le hice caso en su momento. Ahora leyendo esto no se que pensar.", createdAt: "2026-03-31T04:15:00.000Z" },
  ],
};

export function getThreads(): Thread[] {
  if (typeof window === "undefined") return DEFAULT_THREADS;
  const saved = localStorage.getItem("sm_threads");
  return saved ? JSON.parse(saved) : DEFAULT_THREADS;
}

export function saveThreads(threads: Thread[]) {
  localStorage.setItem("sm_threads", JSON.stringify(threads));
}

export function getReplies(threadId: string): Reply[] {
  if (typeof window === "undefined") return DEFAULT_REPLIES[threadId] || [];
  const saved = localStorage.getItem(`sm_replies_${threadId}`);
  return saved ? JSON.parse(saved) : DEFAULT_REPLIES[threadId] || [];
}

export function saveReplies(threadId: string, replies: Reply[]) {
  localStorage.setItem(`sm_replies_${threadId}`, JSON.stringify(replies));
  const threads = getThreads();
  const idx = threads.findIndex((t) => t.id === threadId);
  if (idx !== -1) {
    threads[idx].replies = replies.length;
    localStorage.setItem("sm_threads", JSON.stringify(threads));
  }
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${pad(d.getMonth() + 1)}/${pad(d.getDate())}/${d.getFullYear().toString().slice(2)}(${["Dom","Lun","Mar","Mie","Jue","Vie","Sab"][d.getDay()]})${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

export function renderContent(text: string) {
  return text.split("\n").map((line, i) => {
    if (line.startsWith(">")) {
      return { key: i, isGreentext: true, text: line };
    }
    return { key: i, isGreentext: false, text: line || "\u00A0" };
  });
}
