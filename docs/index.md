# **Propuesta Sito Bank**
## **1. Análisis**
### KPIs actuales
```mermaid
%%{init: {'flowchart': {'layout': 'dagre'}}}%%
flowchart TB



    KPI6["📈 KPI: Reducción de escalaciones<br/>
    Target: <8%<br/>
    Actual: 28%<br/>
    Status: ⚠️"]

    KPI1["📈 KPI: Tiempo de Resolución<br/>
    Target: <24 horas<br/>
    Actual: 8.5 días<br/>
    Status: ⚠️"]

    KPI2["📈 KPI: Satisfacción<br/>
    Target: 4.5/5<br/>
    Actual: 1.9/5<br/>
    Status: ⚠️"]

    KPI3["📈 KPI: Automatización<br/>
    Target: 75%<br/>
    Actual: 0%<br/>
    Status: ⚠️"]

    KPI4["📈 KPI: Casos perdidos<br/>
    Target: 0<br/>
    Status: ⚠️"]

    KPI1:::warning
    KPI2:::warning
    KPI3:::warning
    KPI4:::warning
    KPI6:::warning

    classDef warning fill:#F8D7DA,stroke:#721C24,stroke-width:2px,color:#721C24

```


### Limitaciones Identificadas

   - Regulatorios (trazabilidad, auditabilidad)
   - Técnicos (escalabilidad, integración)
   - Temporales (12 meses para implementación)

### Necesidades por Stakeholder   

| Stakeholder        | Principales intereses                          |
|--------------------|-----------------------------------------------|
| **Superintendencia** | Compliance, seguridad, auditoría              |
| **Clientes**         | Velocidad, transparencia, facilidad           |
| **Operaciones**      | Mantenibilidad, curva de aprendizaje          |



## **2. Principios arquitectónicos**
- Arquitectura Basada en eventos (Event-Driven Architecture).
- Microservicios especializados por dominio bancario.

### Objetivo:
Tener una arquitectura resiliente, escalable, segura, mantenible e integrable con sistemas legacy  y con capacidad de genrar trazabilidad de cada evento pra los cumplientos regulatorios propios de la industria

### **Diagrama 1**. Arquitectura basada en eventos y microsercvicios propuesta para Sito Bank.
```mermaid
flowchart TB
 subgraph Canales["Canales Omnicanal"]
        App["App Móvil"]
        Web["Portal Web"]
        WSP["WhatsApp Business API"]
        API_T["APIs de Integración<br>Terceros"]
  end
 subgraph Seguridad_Perimetro["Perímetro de Seguridad"]
        WAF["Web Application Firewall<br>(Cloudflare/WAF)"]
        Kong["API Gateway: Kong<br>(Rate Limiting, Auth, Routing)"]
        Mesh["Service Mesh: Istio<br>(mTLS, Policies)"]
  end
 subgraph Capa_Interaccion["Capa de Interacción & UX"]
    direction TB
        Canales
        Seguridad_Perimetro
  end
 subgraph Motor_Orq["Motor de Orquestación"]
        Camunda["Camunda/Zeebe<br>(BPMN Workflows)"]
        Drools["Drools Rules Engine<br>(Lógica de Negocio)"]
        Router["Router Inteligente<br>(Clasificación NLP, Reglas, Metadata)"]
  end
 subgraph Servicios_IA["Servicios de IA"]
        NLP["NLP Service<br>(LLM para análisis)"]
        ML["Modelo de ML<br>(Clasificación)"]
        AutoML["MLOps<br>(Mejora Continua)"]
  end
 subgraph Capa_Orquestacion["Orquestación & Inteligencia"]
    direction TB
        Motor_Orq
        Servicios_IA
  end
 subgraph Núcleo_Bancario["Núcleo Bancario"]
        MS_Tarjetas["Tarjetas Service<br>(bloqueos, pagos)"]
        MS_Creditos["Créditos Service<br>(solicitudes, aprobación)"]
        MS_Transacciones["Transacciones Service<br>(movimientos, transferencias)"]
        MS_Clientes["Clientes Service<br>(perfil, KYC)"]
        MS_Cuentas["Cuentas Service<br>(saldo, productos)"]
  end
 subgraph Servicios_Soporte["Servicios de Soporte"]
        MS_Notificaciones["Notificaciones Service<br>(multi-canal)"]
        MS_Documentos["Documentos Service<br>(gestión, firma)"]
        MS_Auditoria["Auditoría Service<br>(trazabilidad completa)"]
  end
 subgraph Capa_Microservicios["Microservicios por Dominio Bancario"]
    direction LR
        Núcleo_Bancario
        Servicios_Soporte
  end
 subgraph Event_Driven["Arquitectura Basada en Eventos"]
        Kafka[("Event Store: Apache Kafka<br>(Streaming, CDC)")]
        Connect["Kafka Connect<br>(Integración Legacy)"]
        KSql["Kafka Streams/KSqlDB<br>(Procesamiento en tiempo real)"]
  end
 subgraph Almacenamiento["Almacenamiento Especializado"]
        DB_PostgreSQL[("PostgreSQL<br>(Datos Transaccionales)")]
        DB_MongoDB[("MongoDB<br>(Documentos No Estructurados)")]
        Cache_Redis[("Redis Cluster<br>(Caché Distribuida)")]
        S3[("Amazon S3/Glacier<br>(Archivos, Backup)")]
  end
 subgraph Analytics["Analytics & Reporting"]
        DWH[("Data Warehouse<br>(Snowflake/Redshift)")]
        Data_Lake[("Data Lake<br>(Delta Lake/Iceberg)")]
        BI["BI &amp; Dashboards<br>(Tableau/Metabase)"]
  end
 subgraph Capa_Datos["Capa de Datos & Eventos"]
    direction TB
        Event_Driven
        Almacenamiento
        Analytics
  end
 subgraph Monitoreo["Monitoreo & Alertas"]
        ELK["ELK Stack<br>(Logs Centralizados)"]
        Prometheus["Prometheus<br>(Métricas &amp; Alertas)"]
        Grafana["Grafana<br>(Dashboards Técnicos)"]
        Jaeger["Jaeger<br>(Tracing Distribuido)"]
  end
 subgraph Observabilidad_Biz["Observabilidad de Negocio"]
        Biz_Metrics["Métricas de Negocio<br>(KPIs, OKRs)"]
        Compliance_Dash["Dashboard Regulatorio<br>(Compliance en tiempo real)"]
        Cost_Ops["Cost Optimization<br>(FinOps)"]
  end
 subgraph Capa_Observabilidad["Observabilidad Integral"]
    direction LR
        Monitoreo
        Observabilidad_Biz
        Capa_Microservicios
        Capa_Datos
  end
 subgraph Infraestructura["Infraestructura como Código"]
        Terraform["Terraform<br>(Multi-cloud, Modules)"]
        Helm["Helm Charts<br>(Package Management)"]
        Crossplane["Crossplane<br>(Control Plane)"]
  end
 subgraph CI_CD["CI/CD & GitOps"]
        ArgoCD["ArgoCD<br>(GitOps, Sync Automático)"]
        Tekton["(CI/CD Pipelines)"]
        Drone["Drone CI<br>(Pipeline as Code)"]
        Quality_Gates["Quality Gates<br>(7 etapas)"]
  end
 subgraph Seguridad_DevSecOps["DevSecOps & Compliance"]
        Vault["HashiCorp Vault<br>(Gestión de Secretos)"]
        Cert_Manager["cert-manager<br>(Certificados TLS)"]
        Compliance_Code["Compliance as Code<br>(Policías en Git)"]
        SAST_DAST["SAST/DAST<br>(Security Scanning)"]
  end
 subgraph Orquestacion["Orquestación de Contenedores"]
        K8s["Kubernetes Cluster<br>(EKS/AKS/GKE)"]
        Karpenter["Karpenter<br>(Auto-scaling Inteligente)"]
        Service_Mesh["Istio Service Mesh<br>(mTLS, Traffic)"]
  end
 subgraph Plataforma_DevOps["DevOps & Seguridad"]
    direction TB
        Infraestructura
        CI_CD
        Seguridad_DevSecOps
        Orquestacion
  end
    Canales --> WAF
    WAF --> Kong
    Kong --> Mesh
    Mesh --> Router & Camunda
    Router --> Camunda
    Camunda --> Drools & Núcleo_Bancario & Servicios_Soporte
    Drools -.-> Servicios_IA
    Núcleo_Bancario --> Kafka & DB_PostgreSQL & Cache_Redis
    Servicios_Soporte --> Kafka & DB_MongoDB
    Kafka --> Connect & KSql
    Connect --> DB_PostgreSQL & DB_MongoDB
    KSql --> DWH & Data_Lake
    DWH --> BI
    Capa_Microservicios -.-> ELK & Prometheus & Jaeger
    Prometheus --> Grafana & Data_Lake
    ELK --> Grafana & Data_Lake
    Jaeger --> Grafana & Data_Lake
    Grafana --> Biz_Metrics & Compliance_Dash
    Terraform --> K8s
    K8s --> Karpenter & Service_Mesh
    ArgoCD --> K8s
    Tekton --> ArgoCD
    Vault --> K8s
    Compliance_Code --> Quality_Gates
    Tekton -. Deploy & Rollback .-> K8s
    ArgoCD -. GitOps Sync .-> K8s
    K8s -. Metrics & Logs .-> Prometheus & ELK
    Vault -. Secrets Injection .-> K8s
    Cert_Manager -. TLS Certificates .-> Kong

    style Kong fill:#ffcc80,stroke:#ef6c00,stroke-width:3px,color:#212121
    style Camunda fill:#d1c4e9,stroke:#4527a0,stroke-width:3px,color:#212121
    style Kafka fill:#c8e6c9,stroke:#2e7d32,stroke-width:4px,color:#212121
    style Capa_Microservicios fill:#e8f5e8,stroke:#1b5e20,stroke-width:2px,color:#212121
    style Capa_Datos fill:#fff3e0,stroke:#e65100,stroke-width:2px,color:#212121
    style K8s fill:#b3e5fc,stroke:#0277bd,stroke-width:3px,color:#212121
    style Capa_Interaccion fill:#e1f5fe,stroke:#01579b,stroke-width:2px,color:#212121
    style Capa_Orquestacion fill:#f3e5f5,stroke:#4a148c,stroke-width:2px,color:#212121
    style Capa_Observabilidad fill:#fce4ec,stroke:#880e4f,stroke-width:2px,color:#212121
    style Plataforma_DevOps fill:#e0f2f1,stroke:#004d40,stroke-width:2px,color:#212121


```
### **Diagrama 2.** Vista detallada de microservicio de inteligencia para Sito Bank.

```mermaid
---
config:
  layout: dagre
  theme: neutral
  themeVariables:
    primaryColor: '#E8F5E8'
    primaryBorderColor: '#1B5E20'
    secondaryColor: '#FFF3E0'
    secondaryBorderColor: '#E65100'
    tertiaryColor: '#F3E5F5'
    tertiaryBorderColor: '#4A148C'
---
flowchart TB
 subgraph IA[Servicios de IA]
    direction LR
        NLP_Service[NLP Service<br>Análisis con LLM]
        ML_Model[Modelo de ML<br>Clasificación No Supervisada]
        AutoML[Generación de Reglas]
        general_ml[Aprendizaje por Refuerzo y Validación de Modelo]
  end
 subgraph Almacenamiento[Capa de Almacenamiento]
        DataLake[Data Lake<br>Almacenamiento crudo]
        VectorDB[Base de Datos<br>Vectorial<br><small>Embeddings &amp; Búsqueda</small>]
  end
 subgraph MLOps[MLOps - Mejora Continua]
        Reinforcement[MIcroservicio de Clasificación de casos y Auditoría]
  end
    Ticket[Caso de Entrada] --> NLP_Service
    NLP_Service --> DataLake
    DataLake --> ML_Model & general_ml
    ML_Model --> AutoML & VectorDB
    AutoML --> general_ml
    general_ml --> Reinforcement
    VectorDB --> NLP_Service
    NLP_Service --> n1[Ticket con Notificación]


    style Ticket fill:#FFF3E0,stroke:#E65100,stroke-width:2px,color:#E65100
    style IA fill:#E8F5E8,stroke:#1B5E20,stroke-width:3px,color:#1B5E20
    style Almacenamiento fill:#E3F2FD,stroke:#0D47A1,stroke-width:2px,color:#0D47A1
    style MLOps fill:#F3E5F5,stroke:#4A148C,stroke-width:2px,color:#4A148C
```

## **3. Flujos críticos**
Con la implementación de la anterior arquitectura se espera respecto a los flujos críticos:
- Bloqueo de tarjeta completamente automatizado.
- Aprobación de créditos de forma semiautomatizada con validación humana.
- Reclamos por transacción no reconocidas con intervención humana mínima.


## **4. Implementación por fases**
### Fase 1. Mes 1-3: seguridad desde el diseño
1. Implementar CI/CD pipeline.
2. Desplegar plataforma de observabilidad.
3. Desarrollar microservicios de cuentas y transacciones.
5. Crear API Gateway básico.
6. Inicio de plan de capacitación y calificación personal.

### Fase 2. Mes 4-6: Expansión
1. Migrar flujos de alto volumen (consultas de saldo).
2. Implementar sistema de eventos.
3. Desarrollar dashboard de monitoreo en tiempo real.
4. Auditorías internas debidamente documentadas y dispuestas para midelos de ML.
5. Entrenar primeros modelos de ML.

### Fase 3. Mes 7-9 : Consolidación
1. Automatizar 60% de flujos.
2. Implementar trazabilidad completa.
3. Conectar todos los canales (app, web, WhatsApp).
4. Capacitación y calificación de equipos operativos.

### Fase 4. Mes 10-12: Optimización
1. Alcanzar 75% automatización.
2. Sistema de mejora continua con MLOps.
3. Dashboard ejecutivo de KPIs
4. Documentación completa


## **5. Estrategias DevSecOps**
- Implementación como código desde la fase 1 de las Políticas regulatorias
- Auditoría automática en cada deploy
- audotoría 


## **6. Consideraciones de compliance**


## **7. Métricas de éxito y Monitoreo**
Con el ob
```mermaid
%%{init: {'flowchart': {'layout': 'dagre'}}}%%
flowchart TB


    KPI6["📈 KPI: Reducción de escalaciones<br>
    Actual: <8%<br>
    Status: ✅🚨"]

    KPI1["📈 KPI: Tiempo de Resolución<br>
    Actual: <24 horas<br>
    Status: ✅🚨"]

    KPI2["📈 KPI: Satisfacción<br>
    Actual: 4.5/5<br>
    Status: ✅🚨"]

    KPI3["📈 KPI: Automatización<br>
    Actual: 75%<br>
    Status: ✅🚨"]

    KPI4["📈 KPI: Casos perdidos<br>
    Actual: 0<br>
    Status: ✅🚨"]

    KPI1:::success
    KPI2:::success
    KPI3:::success
    KPI4:::success
    KPI6:::success

    classDef warning fill:#F8D7DA,stroke:#721C24,stroke-width:2px,color:#721C24
    classDef success fill:#E6F4EA,stroke:#1E7E34,stroke-width:2px,color:#1E7E34

```
