# Fixsell - Plataforma de Equipos de Impresión

<div align="center">
  <img src="src/assets/logo/logo-fixsell-grande.svg" alt="Fixsell Logo" width="200"/>
  
  [![Angular](https://img.shields.io/badge/Angular-16-red?style=flat-square&logo=angular)](https://angular.io/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.1-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
  [![PrimeNG](https://img.shields.io/badge/PrimeNG-16.9-green?style=flat-square)](https://primeng.org/)
  [![Netlify](https://img.shields.io/badge/Deployed%20on-Netlify-00C7B7?style=flat-square&logo=netlify)](https://netlify.com/)
</div>

## 🏢 Acerca del Proyecto

Fixsell es una plataforma web moderna y completa especializada en **venta, renta y servicio de equipos de impresión y gestión documental**. Desarrollada con Angular 16, ofrece una experiencia de usuario optimizada para empresas y particulares que buscan soluciones integrales de impresión.

### 🎯 Misión
Empresa dedicada a la venta, renta, servicio de equipos de impresión y gestión documental, utilizando tecnologías de innovación para añadir valor a las empresas.

## ✨ Características Principales

### 🖨️ **Catálogo de Impresoras**
- Amplia gama de equipos de oficina, producción, inyección de tinta y etiquetas
- Marcas líderes: Konica Minolta, Kyocera, Epson
- Filtros avanzados por categoría, marca, precio, características técnicas
- Información detallada de especificaciones y hojas de datos

### 🛍️ **Servicios Ofrecidos**
- **Venta**: Equipos nuevos con garantía y soporte postventa
- **Renta**: Planes flexibles para proyectos temporales y empresas
- **Servicio Técnico**: Reparación especializada y mantenimiento preventivo
- **Consumibles**: Tóner, tintas, refacciones OEM y genéricos

### 📦 **Funcionalidades Avanzadas**
- Sistema de paquetes de renta personalizables
- Promociones y ofertas especiales
- Landing pages específicas por segmento de mercado
- Gestión de consumibles y compatibilidades
- Formularios de contacto integrados

## 🛠️ Tecnologías Utilizadas

### Frontend
- **Angular 16.2** - Framework principal
- **TypeScript 5.1** - Lenguaje de programación
- **PrimeNG 16.9** - Biblioteca de componentes UI
- **PrimeIcons** - Iconografía
- **SCSS** - Preprocesador CSS
- **RxJS** - Programación reactiva

### Herramientas y Utilidades
- **NGX Mask** - Máscaras de entrada
- **Swiper** - Carruseles y sliders
- **Angular Router** - Navegación
- **Angular Forms** - Formularios reactivos

### Desarrollo y Testing
- **Angular CLI** - Herramientas de desarrollo
- **Jasmine & Karma** - Testing unitario
- **TypeScript Compiler** - Compilación

## 📁 Arquitectura del Proyecto

```
src/
├── app/
│   ├── consumables/          # Módulo de consumibles
│   │   ├── components/       # Componentes de consumibles
│   │   ├── pages/           # Páginas de consumibles
│   │   ├── pipes/           # Pipes específicos
│   │   └── services/        # Servicios de consumibles
│   ├── printers/            # Módulo de impresoras
│   │   ├── components/      # Componentes de impresoras
│   │   ├── interfaces/      # Interfaces TypeScript
│   │   ├── pages/          # Páginas de impresoras
│   │   ├── pipes/          # Pipes de formateo
│   │   └── services/       # Servicios de API
│   ├── pages/              # Páginas principales
│   │   ├── home/           # Página de inicio
│   │   ├── venta/          # Página de venta
│   │   ├── renta/          # Página de renta
│   │   ├── contacto/       # Página de contacto
│   │   └── marketing-landing-pages/ # Landing pages
│   ├── shared/             # Componentes compartidos
│   │   ├── components/     # Componentes reutilizables
│   │   ├── directives/     # Directivas personalizadas
│   │   ├── pipes/          # Pipes globales
│   │   └── services/       # Servicios compartidos
│   └── primeng/            # Configuración PrimeNG
├── assets/                 # Recursos estáticos
│   ├── img/               # Imágenes del sitio
│   ├── fonts/             # Fuentes personalizadas
│   └── logo/              # Logotipos
└── environments/          # Configuraciones de entorno
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn
- Angular CLI

### Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/TheGerrex/fixsell-angular.git
   cd fixsell-angular
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   # Editar src/environments/environment.ts
   export const environment = {
     production: false,
     baseUrl: 'http://localhost:3000'
   };
   ```

## 🏃‍♂️ Comandos Disponibles

### Desarrollo
```bash
# Servidor de desarrollo
npm start
# o
ng serve

# Servidor con watch mode
npm run watch
```

### Construcción
```bash
# Build de producción
npm run build

# Build de desarrollo
ng build --configuration development
```

### Testing
```bash
# Ejecutar tests unitarios
npm test
```

### Generación de Código
```bash
# Generar componente
ng generate component nombre-componente

# Generar servicio
ng generate service nombre-servicio

# Generar módulo
ng generate module nombre-modulo
```

## 🌐 Despliegue

El proyecto está configurado para desplegarse en **Netlify** con las siguientes características:

- **SPA Routing**: Configurado para manejar rutas de Angular
- **Build automático**: Integración con el repositorio Git
- **Funciones serverless**: Soporte para funciones de Netlify

### Configuración de Netlify (`netlify.toml`)
```toml
[build]
  [build.budgets]
    [build.budgets.CSS]
      maximumBudget = 12

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## 📱 Características Responsivas

- **Diseño Mobile-First**: Optimizado para dispositivos móviles
- **Breakpoints adaptativos**: Soporte completo para tablet y desktop
- **Componentes responsivos**: UI adaptable a diferentes tamaños de pantalla
- **Imágenes optimizadas**: Carga eficiente de recursos gráficos

## 🔧 Módulos Principales

### PrintersModule
- Catálogo completo de impresoras
- Filtros avanzados y búsqueda
- Páginas de detalle de productos
- Sistema de paquetes de renta

### ConsumablesModule
- Gestión de consumibles y refacciones
- Compatibilidad con modelos de impresoras
- Categorización por tipo de consumible
- Sistema de colores y rendimiento

### SharedModule
- Componentes reutilizables
- Servicios globales
- Pipes de formateo
- Directivas personalizadas

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -m 'Añadir nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es propiedad de **Fixsell del Norte** y está protegido por derechos de autor.

## 📞 Contacto

- **Website**: [fixsell.com.mx](https://fixsell.com.mx)
- **Facebook**: [fixsell1](https://www.facebook.com/fixsell1)
- **LinkedIn**: [Fixsell del Norte](https://www.linkedin.com/company/fixsell-del-norte/)

---

<div align="center">
  <p>Desarrollado con ❤️ por el equipo de Fixsell del Norte</p>
  <p>© 2025 Fixsell del Norte. Todos los derechos reservados.</p>
</div>

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
