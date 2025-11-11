--
-- PostgreSQL database dump
--

\restrict IwPWKohS1zXNf761LDjHU5ijUnUanwa0UCRgVuNcWYbeQi6X59jsQ0TRRkEUFCR

-- Dumped from database version 16.10 (Ubuntu 16.10-0ubuntu0.24.04.1)
-- Dumped by pg_dump version 16.10 (Ubuntu 16.10-0ubuntu0.24.04.1)

-- Started on 2025-11-11 11:56:15 -03

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 237 (class 1259 OID 66830)
-- Name: agenda_atividade; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.agenda_atividade (
    id_agenda_atividade integer NOT NULL,
    id_atividade integer NOT NULL,
    data date NOT NULL,
    hora time without time zone NOT NULL
);


ALTER TABLE public.agenda_atividade OWNER TO postgres;

--
-- TOC entry 236 (class 1259 OID 66829)
-- Name: agenda_atividade_id_agenda_atividade_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.agenda_atividade_id_agenda_atividade_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.agenda_atividade_id_agenda_atividade_seq OWNER TO postgres;

--
-- TOC entry 3577 (class 0 OID 0)
-- Dependencies: 236
-- Name: agenda_atividade_id_agenda_atividade_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.agenda_atividade_id_agenda_atividade_seq OWNED BY public.agenda_atividade.id_agenda_atividade;


--
-- TOC entry 229 (class 1259 OID 66765)
-- Name: alimentos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.alimentos (
    id_alimentos integer NOT NULL,
    descricao character varying(255) NOT NULL
);


ALTER TABLE public.alimentos OWNER TO postgres;

--
-- TOC entry 235 (class 1259 OID 66814)
-- Name: alimentos_cardapio; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.alimentos_cardapio (
    id_cardapio integer NOT NULL,
    id_alimentos integer NOT NULL
);


ALTER TABLE public.alimentos_cardapio OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 66764)
-- Name: alimentos_id_alimentos_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.alimentos_id_alimentos_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.alimentos_id_alimentos_seq OWNER TO postgres;

--
-- TOC entry 3578 (class 0 OID 0)
-- Dependencies: 228
-- Name: alimentos_id_alimentos_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.alimentos_id_alimentos_seq OWNED BY public.alimentos.id_alimentos;


--
-- TOC entry 227 (class 1259 OID 66752)
-- Name: atividade; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.atividade (
    id_atividade integer NOT NULL,
    id_usuario_professor integer NOT NULL,
    vagas integer NOT NULL,
    recorrente boolean DEFAULT false NOT NULL,
    nome character varying(65) NOT NULL,
    descricao character varying(255) NOT NULL,
    dia_semana character varying(12) NOT NULL
);


ALTER TABLE public.atividade OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 66751)
-- Name: atividade_id_atividade_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.atividade_id_atividade_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.atividade_id_atividade_seq OWNER TO postgres;

--
-- TOC entry 3579 (class 0 OID 0)
-- Dependencies: 226
-- Name: atividade_id_atividade_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.atividade_id_atividade_seq OWNED BY public.atividade.id_atividade;


--
-- TOC entry 234 (class 1259 OID 66799)
-- Name: atividades_idoso; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.atividades_idoso (
    id_usuario_idoso integer NOT NULL,
    id_atividade integer NOT NULL
);


ALTER TABLE public.atividades_idoso OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 66772)
-- Name: cardapio; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cardapio (
    id_cardapio integer NOT NULL,
    id_usuario_funcionario integer NOT NULL,
    cardapio text NOT NULL,
    data_hora timestamp without time zone NOT NULL
);


ALTER TABLE public.cardapio OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 66771)
-- Name: cardapio_id_cardapio_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cardapio_id_cardapio_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cardapio_id_cardapio_seq OWNER TO postgres;

--
-- TOC entry 3580 (class 0 OID 0)
-- Dependencies: 230
-- Name: cardapio_id_cardapio_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cardapio_id_cardapio_seq OWNED BY public.cardapio.id_cardapio;


--
-- TOC entry 225 (class 1259 OID 66735)
-- Name: contato; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.contato (
    id_contato integer NOT NULL,
    id_usuario integer,
    id_instituicao integer,
    tipo character varying(45) NOT NULL,
    descricao character varying(65) NOT NULL
);


ALTER TABLE public.contato OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 66734)
-- Name: contato_id_contato_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.contato_id_contato_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.contato_id_contato_seq OWNER TO postgres;

--
-- TOC entry 3581 (class 0 OID 0)
-- Dependencies: 224
-- Name: contato_id_contato_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.contato_id_contato_seq OWNED BY public.contato.id_contato;


--
-- TOC entry 216 (class 1259 OID 66666)
-- Name: endereco; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.endereco (
    id_endereco integer NOT NULL,
    cidade character varying(45) NOT NULL,
    numero integer NOT NULL,
    rua character varying(65) NOT NULL,
    cep character varying(9) NOT NULL,
    complemento character varying(30) NOT NULL,
    bairro character varying(65) NOT NULL
);


ALTER TABLE public.endereco OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 66665)
-- Name: endereco_id_endereco_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.endereco_id_endereco_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.endereco_id_endereco_seq OWNER TO postgres;

--
-- TOC entry 3582 (class 0 OID 0)
-- Dependencies: 215
-- Name: endereco_id_endereco_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.endereco_id_endereco_seq OWNED BY public.endereco.id_endereco;


--
-- TOC entry 223 (class 1259 OID 66724)
-- Name: funcionario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.funcionario (
    id_usuario integer NOT NULL
);


ALTER TABLE public.funcionario OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 66712)
-- Name: idoso; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.idoso (
    id_usuario integer NOT NULL,
    obs text NOT NULL,
    restricao_medica text NOT NULL
);


ALTER TABLE public.idoso OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 66673)
-- Name: instituicao; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.instituicao (
    id_instituicao integer NOT NULL,
    id_endereco integer NOT NULL,
    orgao_responsavel character varying(100) NOT NULL
);


ALTER TABLE public.instituicao OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 66672)
-- Name: instituicao_id_instituicao_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.instituicao_id_instituicao_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.instituicao_id_instituicao_seq OWNER TO postgres;

--
-- TOC entry 3583 (class 0 OID 0)
-- Dependencies: 217
-- Name: instituicao_id_instituicao_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.instituicao_id_instituicao_seq OWNED BY public.instituicao.id_instituicao;


--
-- TOC entry 233 (class 1259 OID 66786)
-- Name: noticias; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.noticias (
    id_noticias integer NOT NULL,
    id_usuario_funcionario integer NOT NULL,
    titulo character varying(65) NOT NULL,
    fonte character varying(255) NOT NULL,
    descricao character varying(255) NOT NULL
);


ALTER TABLE public.noticias OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 66785)
-- Name: noticias_id_noticias_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.noticias_id_noticias_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.noticias_id_noticias_seq OWNER TO postgres;

--
-- TOC entry 3584 (class 0 OID 0)
-- Dependencies: 232
-- Name: noticias_id_noticias_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.noticias_id_noticias_seq OWNED BY public.noticias.id_noticias;


--
-- TOC entry 221 (class 1259 OID 66702)
-- Name: professor; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.professor (
    id_usuario integer NOT NULL
);


ALTER TABLE public.professor OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 66685)
-- Name: usuario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuario (
    id_usuario integer NOT NULL,
    id_endereco integer NOT NULL,
    nome character varying(150) NOT NULL,
    cpf character varying(11) NOT NULL,
    login character varying(16) NOT NULL,
    senha character varying(255) NOT NULL,
    datanascimento date NOT NULL,
    genero character varying(1) NOT NULL,
    CONSTRAINT usuario_datanascimento_check CHECK ((datanascimento < CURRENT_DATE)),
    CONSTRAINT usuario_genero_check CHECK (((genero)::text = ANY ((ARRAY['F'::character varying, 'M'::character varying, 'O'::character varying])::text[])))
);


ALTER TABLE public.usuario OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 66684)
-- Name: usuario_id_usuario_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuario_id_usuario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuario_id_usuario_seq OWNER TO postgres;

--
-- TOC entry 3585 (class 0 OID 0)
-- Dependencies: 219
-- Name: usuario_id_usuario_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuario_id_usuario_seq OWNED BY public.usuario.id_usuario;


--
-- TOC entry 3356 (class 2604 OID 66833)
-- Name: agenda_atividade id_agenda_atividade; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.agenda_atividade ALTER COLUMN id_agenda_atividade SET DEFAULT nextval('public.agenda_atividade_id_agenda_atividade_seq'::regclass);


--
-- TOC entry 3353 (class 2604 OID 66768)
-- Name: alimentos id_alimentos; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alimentos ALTER COLUMN id_alimentos SET DEFAULT nextval('public.alimentos_id_alimentos_seq'::regclass);


--
-- TOC entry 3351 (class 2604 OID 66755)
-- Name: atividade id_atividade; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.atividade ALTER COLUMN id_atividade SET DEFAULT nextval('public.atividade_id_atividade_seq'::regclass);


--
-- TOC entry 3354 (class 2604 OID 66775)
-- Name: cardapio id_cardapio; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cardapio ALTER COLUMN id_cardapio SET DEFAULT nextval('public.cardapio_id_cardapio_seq'::regclass);


--
-- TOC entry 3350 (class 2604 OID 66738)
-- Name: contato id_contato; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contato ALTER COLUMN id_contato SET DEFAULT nextval('public.contato_id_contato_seq'::regclass);


--
-- TOC entry 3347 (class 2604 OID 66669)
-- Name: endereco id_endereco; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.endereco ALTER COLUMN id_endereco SET DEFAULT nextval('public.endereco_id_endereco_seq'::regclass);


--
-- TOC entry 3348 (class 2604 OID 66676)
-- Name: instituicao id_instituicao; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.instituicao ALTER COLUMN id_instituicao SET DEFAULT nextval('public.instituicao_id_instituicao_seq'::regclass);


--
-- TOC entry 3355 (class 2604 OID 66789)
-- Name: noticias id_noticias; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.noticias ALTER COLUMN id_noticias SET DEFAULT nextval('public.noticias_id_noticias_seq'::regclass);


--
-- TOC entry 3349 (class 2604 OID 66688)
-- Name: usuario id_usuario; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario ALTER COLUMN id_usuario SET DEFAULT nextval('public.usuario_id_usuario_seq'::regclass);


--
-- TOC entry 3571 (class 0 OID 66830)
-- Dependencies: 237
-- Data for Name: agenda_atividade; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.agenda_atividade (id_agenda_atividade, id_atividade, data, hora) FROM stdin;
\.


--
-- TOC entry 3563 (class 0 OID 66765)
-- Dependencies: 229
-- Data for Name: alimentos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.alimentos (id_alimentos, descricao) FROM stdin;
1	Arroz Integral
2	Feijão Preto
3	Peito de Frango
4	Alface
5	Tomate
6	Maçã
\.


--
-- TOC entry 3569 (class 0 OID 66814)
-- Dependencies: 235
-- Data for Name: alimentos_cardapio; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.alimentos_cardapio (id_cardapio, id_alimentos) FROM stdin;
1	3
1	4
1	5
\.


--
-- TOC entry 3561 (class 0 OID 66752)
-- Dependencies: 227
-- Data for Name: atividade; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.atividade (id_atividade, id_usuario_professor, vagas, recorrente, nome, descricao, dia_semana) FROM stdin;
1	3	20	t	Yoga Leve	Yoga para iniciantes e terceira idade	Segunda
2	6	15	f	Pintura em Tela	Curso de pintura a óleo para iniciantes	Quarta
\.


--
-- TOC entry 3568 (class 0 OID 66799)
-- Dependencies: 234
-- Data for Name: atividades_idoso; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.atividades_idoso (id_usuario_idoso, id_atividade) FROM stdin;
1	1
4	2
1	2
\.


--
-- TOC entry 3565 (class 0 OID 66772)
-- Dependencies: 231
-- Data for Name: cardapio; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cardapio (id_cardapio, id_usuario_funcionario, cardapio, data_hora) FROM stdin;
1	2	Almoço: Arroz, feijão, frango grelhado e salada.	2025-10-29 12:00:00
2	5	Jantar: Sopa de legumes e pão integral.	2025-10-29 19:00:00
\.


--
-- TOC entry 3559 (class 0 OID 66735)
-- Dependencies: 225
-- Data for Name: contato; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.contato (id_contato, id_usuario, id_instituicao, tipo, descricao) FROM stdin;
1	1	\N	Telefone Celular	(11) 98765-4321
2	4	\N	Email	maria.oliveira@email.com
3	5	\N	Telefone Ramal	Ramal 205
\.


--
-- TOC entry 3550 (class 0 OID 66666)
-- Dependencies: 216
-- Data for Name: endereco; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.endereco (id_endereco, cidade, numero, rua, cep, complemento, bairro) FROM stdin;
1	São Paulo	100	Rua das Flores	01001-000	Apto 1	Centro
2	Florianópolis	550	Avenida Beira Mar	88015-000	Casa	Agronômica
3	Rio de Janeiro	123	Rua Copacabana	22020-001	Apto 404	Copacabana
\.


--
-- TOC entry 3557 (class 0 OID 66724)
-- Dependencies: 223
-- Data for Name: funcionario; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.funcionario (id_usuario) FROM stdin;
2
5
\.


--
-- TOC entry 3556 (class 0 OID 66712)
-- Dependencies: 222
-- Data for Name: idoso; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.idoso (id_usuario, obs, restricao_medica) FROM stdin;
1	Nenhuma observação	Alergia a amendoim
4	Participa ativamente de tudo	Intolerante à lactose
\.


--
-- TOC entry 3552 (class 0 OID 66673)
-- Dependencies: 218
-- Data for Name: instituicao; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.instituicao (id_instituicao, id_endereco, orgao_responsavel) FROM stdin;
\.


--
-- TOC entry 3567 (class 0 OID 66786)
-- Dependencies: 233
-- Data for Name: noticias; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.noticias (id_noticias, id_usuario_funcionario, titulo, fonte, descricao) FROM stdin;
1	2	Festa Junina Confirmada!	g1.com	Nossa festa junina anual ocorrerá no próximo mês.
\.


--
-- TOC entry 3555 (class 0 OID 66702)
-- Dependencies: 221
-- Data for Name: professor; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.professor (id_usuario) FROM stdin;
3
6
\.


--
-- TOC entry 3554 (class 0 OID 66685)
-- Dependencies: 220
-- Data for Name: usuario; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuario (id_usuario, id_endereco, nome, cpf, login, senha, datanascimento, genero) FROM stdin;
1	1	João Silva	12345678900	12345678900	idoso123	1940-05-15	M
2	1	Ana Costa	98765432100	func01	func123	1990-10-20	F
3	1	Carlos Souza	11122233344	prof01	prof123	1985-03-08	M
4	2	Maria Oliveira	44455566677	maria444	senha456	1945-01-30	F
5	2	Bruno Martins	88899900011	bruno02	func456	1995-07-10	M
6	3	Sofia Almeida	77766655544	prof_sofia	prof789	1988-11-05	F
\.


--
-- TOC entry 3586 (class 0 OID 0)
-- Dependencies: 236
-- Name: agenda_atividade_id_agenda_atividade_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.agenda_atividade_id_agenda_atividade_seq', 1, false);


--
-- TOC entry 3587 (class 0 OID 0)
-- Dependencies: 228
-- Name: alimentos_id_alimentos_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.alimentos_id_alimentos_seq', 6, true);


--
-- TOC entry 3588 (class 0 OID 0)
-- Dependencies: 226
-- Name: atividade_id_atividade_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.atividade_id_atividade_seq', 2, true);


--
-- TOC entry 3589 (class 0 OID 0)
-- Dependencies: 230
-- Name: cardapio_id_cardapio_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cardapio_id_cardapio_seq', 2, true);


--
-- TOC entry 3590 (class 0 OID 0)
-- Dependencies: 224
-- Name: contato_id_contato_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.contato_id_contato_seq', 3, true);


--
-- TOC entry 3591 (class 0 OID 0)
-- Dependencies: 215
-- Name: endereco_id_endereco_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.endereco_id_endereco_seq', 3, true);


--
-- TOC entry 3592 (class 0 OID 0)
-- Dependencies: 217
-- Name: instituicao_id_instituicao_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.instituicao_id_instituicao_seq', 1, false);


--
-- TOC entry 3593 (class 0 OID 0)
-- Dependencies: 232
-- Name: noticias_id_noticias_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.noticias_id_noticias_seq', 1, true);


--
-- TOC entry 3594 (class 0 OID 0)
-- Dependencies: 219
-- Name: usuario_id_usuario_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuario_id_usuario_seq', 6, true);


--
-- TOC entry 3390 (class 2606 OID 66835)
-- Name: agenda_atividade agenda_atividade_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.agenda_atividade
    ADD CONSTRAINT agenda_atividade_pkey PRIMARY KEY (id_agenda_atividade);


--
-- TOC entry 3388 (class 2606 OID 66818)
-- Name: alimentos_cardapio alimentos_cardapio_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alimentos_cardapio
    ADD CONSTRAINT alimentos_cardapio_pkey PRIMARY KEY (id_cardapio, id_alimentos);


--
-- TOC entry 3380 (class 2606 OID 66770)
-- Name: alimentos alimentos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alimentos
    ADD CONSTRAINT alimentos_pkey PRIMARY KEY (id_alimentos);


--
-- TOC entry 3378 (class 2606 OID 66758)
-- Name: atividade atividade_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.atividade
    ADD CONSTRAINT atividade_pkey PRIMARY KEY (id_atividade);


--
-- TOC entry 3386 (class 2606 OID 66803)
-- Name: atividades_idoso atividades_idoso_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.atividades_idoso
    ADD CONSTRAINT atividades_idoso_pkey PRIMARY KEY (id_usuario_idoso, id_atividade);


--
-- TOC entry 3382 (class 2606 OID 66779)
-- Name: cardapio cardapio_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cardapio
    ADD CONSTRAINT cardapio_pkey PRIMARY KEY (id_cardapio);


--
-- TOC entry 3376 (class 2606 OID 66740)
-- Name: contato contato_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contato
    ADD CONSTRAINT contato_pkey PRIMARY KEY (id_contato);


--
-- TOC entry 3360 (class 2606 OID 66671)
-- Name: endereco endereco_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.endereco
    ADD CONSTRAINT endereco_pkey PRIMARY KEY (id_endereco);


--
-- TOC entry 3374 (class 2606 OID 66728)
-- Name: funcionario funcionario_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.funcionario
    ADD CONSTRAINT funcionario_pkey PRIMARY KEY (id_usuario);


--
-- TOC entry 3372 (class 2606 OID 66718)
-- Name: idoso idoso_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.idoso
    ADD CONSTRAINT idoso_pkey PRIMARY KEY (id_usuario);


--
-- TOC entry 3362 (class 2606 OID 66678)
-- Name: instituicao instituicao_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.instituicao
    ADD CONSTRAINT instituicao_pkey PRIMARY KEY (id_instituicao);


--
-- TOC entry 3384 (class 2606 OID 66793)
-- Name: noticias noticias_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.noticias
    ADD CONSTRAINT noticias_pkey PRIMARY KEY (id_noticias);


--
-- TOC entry 3370 (class 2606 OID 66706)
-- Name: professor professor_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.professor
    ADD CONSTRAINT professor_pkey PRIMARY KEY (id_usuario);


--
-- TOC entry 3364 (class 2606 OID 66694)
-- Name: usuario usuario_cpf_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_cpf_key UNIQUE (cpf);


--
-- TOC entry 3366 (class 2606 OID 66696)
-- Name: usuario usuario_login_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_login_key UNIQUE (login);


--
-- TOC entry 3368 (class 2606 OID 66692)
-- Name: usuario usuario_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (id_usuario);


--
-- TOC entry 3403 (class 2606 OID 66824)
-- Name: alimentos_cardapio fk_id_alimentos_alimen_cardapio; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alimentos_cardapio
    ADD CONSTRAINT fk_id_alimentos_alimen_cardapio FOREIGN KEY (id_alimentos) REFERENCES public.alimentos(id_alimentos);


--
-- TOC entry 3405 (class 2606 OID 66836)
-- Name: agenda_atividade fk_id_atividade_agenda_ativ; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.agenda_atividade
    ADD CONSTRAINT fk_id_atividade_agenda_ativ FOREIGN KEY (id_atividade) REFERENCES public.atividade(id_atividade);


--
-- TOC entry 3401 (class 2606 OID 66809)
-- Name: atividades_idoso fk_id_atividade_ativ_idoso; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.atividades_idoso
    ADD CONSTRAINT fk_id_atividade_ativ_idoso FOREIGN KEY (id_atividade) REFERENCES public.atividade(id_atividade);


--
-- TOC entry 3404 (class 2606 OID 66819)
-- Name: alimentos_cardapio fk_id_cardapio_alimen_cardapio; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alimentos_cardapio
    ADD CONSTRAINT fk_id_cardapio_alimen_cardapio FOREIGN KEY (id_cardapio) REFERENCES public.cardapio(id_cardapio);


--
-- TOC entry 3391 (class 2606 OID 66679)
-- Name: instituicao fk_id_endereco_instituicao; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.instituicao
    ADD CONSTRAINT fk_id_endereco_instituicao FOREIGN KEY (id_endereco) REFERENCES public.endereco(id_endereco);


--
-- TOC entry 3392 (class 2606 OID 66697)
-- Name: usuario fk_id_endereco_usuario; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT fk_id_endereco_usuario FOREIGN KEY (id_endereco) REFERENCES public.endereco(id_endereco);


--
-- TOC entry 3396 (class 2606 OID 66746)
-- Name: contato fk_id_instituicao_contato; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contato
    ADD CONSTRAINT fk_id_instituicao_contato FOREIGN KEY (id_instituicao) REFERENCES public.instituicao(id_instituicao);


--
-- TOC entry 3397 (class 2606 OID 66741)
-- Name: contato fk_id_usuario_contato; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contato
    ADD CONSTRAINT fk_id_usuario_contato FOREIGN KEY (id_usuario) REFERENCES public.usuario(id_usuario);


--
-- TOC entry 3395 (class 2606 OID 66729)
-- Name: funcionario fk_id_usuario_funcionario; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.funcionario
    ADD CONSTRAINT fk_id_usuario_funcionario FOREIGN KEY (id_usuario) REFERENCES public.usuario(id_usuario);


--
-- TOC entry 3399 (class 2606 OID 66780)
-- Name: cardapio fk_id_usuario_funcionario_cardapio; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cardapio
    ADD CONSTRAINT fk_id_usuario_funcionario_cardapio FOREIGN KEY (id_usuario_funcionario) REFERENCES public.funcionario(id_usuario);


--
-- TOC entry 3400 (class 2606 OID 66794)
-- Name: noticias fk_id_usuario_funcionario_noticias; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.noticias
    ADD CONSTRAINT fk_id_usuario_funcionario_noticias FOREIGN KEY (id_usuario_funcionario) REFERENCES public.funcionario(id_usuario);


--
-- TOC entry 3394 (class 2606 OID 66719)
-- Name: idoso fk_id_usuario_idoso; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.idoso
    ADD CONSTRAINT fk_id_usuario_idoso FOREIGN KEY (id_usuario) REFERENCES public.usuario(id_usuario);


--
-- TOC entry 3402 (class 2606 OID 66804)
-- Name: atividades_idoso fk_id_usuario_idoso_ativ_idoso; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.atividades_idoso
    ADD CONSTRAINT fk_id_usuario_idoso_ativ_idoso FOREIGN KEY (id_usuario_idoso) REFERENCES public.idoso(id_usuario);


--
-- TOC entry 3393 (class 2606 OID 66707)
-- Name: professor fk_id_usuario_professor; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.professor
    ADD CONSTRAINT fk_id_usuario_professor FOREIGN KEY (id_usuario) REFERENCES public.usuario(id_usuario);


--
-- TOC entry 3398 (class 2606 OID 66759)
-- Name: atividade fk_id_usuario_professor_atividade; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.atividade
    ADD CONSTRAINT fk_id_usuario_professor_atividade FOREIGN KEY (id_usuario_professor) REFERENCES public.professor(id_usuario);


-- Completed on 2025-11-11 11:56:15 -03

--
-- PostgreSQL database dump complete
--

\unrestrict IwPWKohS1zXNf761LDjHU5ijUnUanwa0UCRgVuNcWYbeQi6X59jsQ0TRRkEUFCR

