--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

-- Started on 2023-04-26 16:45:22

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

--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- TOC entry 3384 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 219 (class 1259 OID 21502)
-- Name: blogs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.blogs (
    blog_id integer NOT NULL,
    creator integer NOT NULL,
    title text NOT NULL,
    content text NOT NULL,
    category_id integer NOT NULL
);


ALTER TABLE public.blogs OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 21501)
-- Name: blogs_blog_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.blogs_blog_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.blogs_blog_id_seq OWNER TO postgres;

--
-- TOC entry 3385 (class 0 OID 0)
-- Dependencies: 218
-- Name: blogs_blog_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.blogs_blog_id_seq OWNED BY public.blogs.blog_id;


--
-- TOC entry 214 (class 1259 OID 21460)
-- Name: category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.category (
    category_id integer NOT NULL,
    name character varying(100) NOT NULL
);


ALTER TABLE public.category OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 21463)
-- Name: category_category_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.category_category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.category_category_id_seq OWNER TO postgres;

--
-- TOC entry 3386 (class 0 OID 0)
-- Dependencies: 215
-- Name: category_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.category_category_id_seq OWNED BY public.category.category_id;


--
-- TOC entry 221 (class 1259 OID 21606)
-- Name: comments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comments (
    comment_id integer NOT NULL,
    user_id integer NOT NULL,
    blog_id integer NOT NULL,
    content text NOT NULL
);


ALTER TABLE public.comments OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 21605)
-- Name: comments_comment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.comments_comment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comments_comment_id_seq OWNER TO postgres;

--
-- TOC entry 3387 (class 0 OID 0)
-- Dependencies: 220
-- Name: comments_comment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.comments_comment_id_seq OWNED BY public.comments.comment_id;


--
-- TOC entry 223 (class 1259 OID 21627)
-- Name: ratings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ratings (
    rating_id integer NOT NULL,
    user_id integer NOT NULL,
    blog_id integer NOT NULL,
    rating integer,
    CONSTRAINT ratings_rating_check CHECK (((rating >= 1) AND (rating <= 10)))
);


ALTER TABLE public.ratings OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 21626)
-- Name: ratings_rating_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ratings_rating_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.ratings_rating_id_seq OWNER TO postgres;

--
-- TOC entry 3388 (class 0 OID 0)
-- Dependencies: 222
-- Name: ratings_rating_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ratings_rating_id_seq OWNED BY public.ratings.rating_id;


--
-- TOC entry 216 (class 1259 OID 21470)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    username character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(255) NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 21473)
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_user_id_seq OWNER TO postgres;

--
-- TOC entry 3389 (class 0 OID 0)
-- Dependencies: 217
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- TOC entry 3195 (class 2604 OID 21505)
-- Name: blogs blog_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.blogs ALTER COLUMN blog_id SET DEFAULT nextval('public.blogs_blog_id_seq'::regclass);


--
-- TOC entry 3193 (class 2604 OID 21474)
-- Name: category category_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category ALTER COLUMN category_id SET DEFAULT nextval('public.category_category_id_seq'::regclass);


--
-- TOC entry 3196 (class 2604 OID 21609)
-- Name: comments comment_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments ALTER COLUMN comment_id SET DEFAULT nextval('public.comments_comment_id_seq'::regclass);


--
-- TOC entry 3197 (class 2604 OID 21630)
-- Name: ratings rating_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ratings ALTER COLUMN rating_id SET DEFAULT nextval('public.ratings_rating_id_seq'::regclass);


--
-- TOC entry 3194 (class 2604 OID 21476)
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- TOC entry 3374 (class 0 OID 21502)
-- Dependencies: 219
-- Data for Name: blogs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.blogs (blog_id, creator, title, content, category_id) FROM stdin;
7	6	Archived: Node.js Medium Collection	Hi all. Thanks so much for your interest in the Node.js Medium Collection. We’ve decided to retire the initiative to curate Node.js content. There are many other places to get great content and we wis	1
9	6	Simple server side cache for Express.js with Node.js	This blog was written by Guilherme Oenning who is a Senior Software Developer at SoftwareONE. He truly believes that learning never ends and sharing knowledge is key to growth. When not programming, he	1
10	3	Node.js 16 available now	This blog was written by Bethany Griggs, with additional contributions from the Node.js Technical Steering Committee. We are excited to announce the release of Node.js 16 today! Highlights include the	1
11	3	Finally understanding how references work in Android and Java	A few weeks ago I attended Mobiconf, one of the best conferences for Mobile Developers I had the pleasure to attend in Poland. During his	3
12	4	How to rewrite your SQL queries in Pandas, and more	Fifteen years ago, there were only a few skills a software developer would need to know well, and he or she would have a decent shot at 95% of the listed job positions. Those skills were: Object-oriented	4
13	4	Ten SQL Concepts You Should Know for Data Science Interviews	Study smart, not hard. — SQL is extremely powerful and has a lot of functionality. When it comes to data science interviews, however, the	4
14	4	I created the exact same app in React and Vue. Here are the difference	Having used Vue at work, I had a fairly solid understanding of it. I was, however, curious to know what the grass was like on the other side of	2
1	3	This blog on SQL	we can learn sql	4
15	4	I d created the exact same app in React and Vue. Here are the difference	Having used Vue at work, I had a fairly solid understanding of it. I was, however, curious to know what the grass was like on the other side of	2
2	3	This a blog on SQL	we Nodejs blog	1
16	11	I d created the exact same app in React and Vue. Here are the difference	Having used Vue at work, I had a fairly solid understanding of it. I was, however, curious to know what the grass was like on the other side of	2
\.


--
-- TOC entry 3369 (class 0 OID 21460)
-- Dependencies: 214
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.category (category_id, name) FROM stdin;
1	NodeJS
2	REACT
3	JAVA
4	SQL
\.


--
-- TOC entry 3376 (class 0 OID 21606)
-- Dependencies: 221
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comments (comment_id, user_id, blog_id, content) FROM stdin;
3	11	10	THIS BLOg IS AWESOME
2	11	10	new content
\.


--
-- TOC entry 3378 (class 0 OID 21627)
-- Dependencies: 223
-- Data for Name: ratings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ratings (rating_id, user_id, blog_id, rating) FROM stdin;
1	2	7	9
2	5	9	7
13	2	2	9
14	3	7	7
15	6	7	7
16	4	7	7
17	4	2	7
18	4	1	7
19	4	12	7
20	3	12	6
21	3	2	6
22	3	9	10
23	10	7	9
24	10	1	9
25	10	9	8
\.


--
-- TOC entry 3371 (class 0 OID 21470)
-- Dependencies: 216
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (user_id, username, email, password) FROM stdin;
1	abhi4	abhi4@gmail.com	abhi1234
2	abhi1	abhi1@gmail.com	abhi1
3	mg	mg@gmail.com	mg1
4	mahadev	mahadev@gmail.com	mahadev
5	abhi	abhijeet@gmail.com	abhijeet
6	ram1	ram@gmail.com	ram1234
7	ram11	ramgmail.com	ram1234
8	ram121	3df@gmail.com	ram1234
9	8ram121	3dfmail.com	ram1234
10	GodboleMahadev	Godbole@gmail.com	$2b$10$2gcoKbx5nxPDK1r6VhLvK.WXnou00iepw5znDfCnFqEb0ZNV2t4ZK
11	text	text@gmail.com	$2b$10$p3WCen7XnjyPbeuQRGFQb.Yl9OUBVk..03ruLe0WX0odoAUp7XXrq
12	text1	text1@gmail.com	$2b$10$JCcf0zaYq0Q0rRZzzYuyFODjxAm4lxpHsa0hRHgMytYe1zTQpWbJ2
13	text2	text2@gmail.com	$2b$15$B1gwr5849BOFv0ifuXXIfO2snWFf6hyBHX1Sg5SXLZrUb0x2y4002
14	text3	text3@gmail.com	$2b$17$NMKUJyoi2vPXMzN6VMIhDebV8meohzike37noEV9lQ4bvt2CgBHEu
15	text4	text4@gmail.com	$2b$10$ZsshGC6hB3QvCCna1b1MWOoApf8v9OOgkg2sOEt.o/HuBhSLGoGPu
16	text42	text42@gmail.com	$2b$10$Ho8xVEeneat7v6yEfcxEdOgu2EG8f3phgbmCrqhl4lF3u/wNASoT2
\.


--
-- TOC entry 3390 (class 0 OID 0)
-- Dependencies: 218
-- Name: blogs_blog_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.blogs_blog_id_seq', 17, true);


--
-- TOC entry 3391 (class 0 OID 0)
-- Dependencies: 215
-- Name: category_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.category_category_id_seq', 4, true);


--
-- TOC entry 3392 (class 0 OID 0)
-- Dependencies: 220
-- Name: comments_comment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comments_comment_id_seq', 3, true);


--
-- TOC entry 3393 (class 0 OID 0)
-- Dependencies: 222
-- Name: ratings_rating_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ratings_rating_id_seq', 26, true);


--
-- TOC entry 3394 (class 0 OID 0)
-- Dependencies: 217
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_user_id_seq', 16, true);


--
-- TOC entry 3212 (class 2606 OID 21509)
-- Name: blogs blogs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.blogs
    ADD CONSTRAINT blogs_pkey PRIMARY KEY (blog_id);


--
-- TOC entry 3201 (class 2606 OID 21478)
-- Name: category category_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_name_key UNIQUE (name);


--
-- TOC entry 3203 (class 2606 OID 21480)
-- Name: category category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (category_id);


--
-- TOC entry 3214 (class 2606 OID 21615)
-- Name: comments comments_comment_id_user_id_blog_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_comment_id_user_id_blog_id_key UNIQUE (comment_id, user_id, blog_id);


--
-- TOC entry 3216 (class 2606 OID 21613)
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (comment_id);


--
-- TOC entry 3218 (class 2606 OID 21633)
-- Name: ratings ratings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ratings
    ADD CONSTRAINT ratings_pkey PRIMARY KEY (rating_id);


--
-- TOC entry 3220 (class 2606 OID 21635)
-- Name: ratings ratings_user_id_blog_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ratings
    ADD CONSTRAINT ratings_user_id_blog_id_key UNIQUE (user_id, blog_id);


--
-- TOC entry 3206 (class 2606 OID 21484)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 3208 (class 2606 OID 21486)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- TOC entry 3210 (class 2606 OID 21488)
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- TOC entry 3199 (class 1259 OID 21489)
-- Name: PRIMARY; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "PRIMARY" ON public.category USING btree (category_id);


--
-- TOC entry 3204 (class 1259 OID 21490)
-- Name: name; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX name ON public.category USING btree (name);


--
-- TOC entry 3221 (class 2606 OID 21510)
-- Name: blogs blogs_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.blogs
    ADD CONSTRAINT blogs_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.category(category_id);


--
-- TOC entry 3222 (class 2606 OID 21515)
-- Name: blogs blogs_creator_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.blogs
    ADD CONSTRAINT blogs_creator_fkey FOREIGN KEY (creator) REFERENCES public.users(user_id);


--
-- TOC entry 3223 (class 2606 OID 21621)
-- Name: comments comments_blog_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_blog_id_fkey FOREIGN KEY (blog_id) REFERENCES public.blogs(blog_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3224 (class 2606 OID 21616)
-- Name: comments comments_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3225 (class 2606 OID 21641)
-- Name: ratings ratings_blog_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ratings
    ADD CONSTRAINT ratings_blog_id_fkey FOREIGN KEY (blog_id) REFERENCES public.blogs(blog_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3226 (class 2606 OID 21636)
-- Name: ratings ratings_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ratings
    ADD CONSTRAINT ratings_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2023-04-26 16:45:22

--
-- PostgreSQL database dump complete
--

