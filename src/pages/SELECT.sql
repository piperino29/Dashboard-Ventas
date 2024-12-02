SELECT 
	vw.pro_inst_id, 
	vw.pro_inst_name_pre,
	vw.pro_inst_name_num,
	vw.pro_inst_create_date,
	vw.pro_inst_status,
	vw.bus_ent_inst_id,

	CASE 
	    WHEN vw.pro_inst_status = 'F' or (SELECT ent_inst_att_str_value FROM bus_ent_inst_attribute WHERE att_id = (SELECT att_id_auto FROM attribute WHERE att_name = 'OT_FACTURA') AND bus_ent_inst_id = vw.bus_ent_inst_id) <> '' THEN 'Facturado'
	    WHEN vw.pro_inst_status = 'R' or (SELECT ent_inst_att_str_value FROM bus_ent_inst_attribute WHERE att_id = (SELECT att_id_auto FROM attribute WHERE att_name = 'OT_FACTURA') AND bus_ent_inst_id = vw.bus_ent_inst_id) = '' THEN 'Pendiente'
	    WHEN vw.pro_inst_status = 'C' THEN 'Completado'
	    WHEN vw.pro_inst_status = 'N' THEN 'Cancelado'
	    
	END AS "Estado tarea",


	
	vw.att_value_3 as numot_vehicular, 
	vw.ent_inst_att_value_8 as numot_hija, 
	(select ent_inst_att_str_value from bus_ent_inst_attribute where att_id = 3036 and bus_ent_inst_id =  vw.bus_ent_inst_id) as patente,
	vw.ent_inst_att_value_2 as razonsocial, 
	vw.ent_inst_att_value_3 as rut,
	(select ent_inst_att_str_value from bus_ent_inst_attribute where att_id = 3155 and bus_ent_inst_id = vw.bus_ent_inst_id) as marca,
	(select att_value_1 from bus_ent_instance where bus_ent_inst_name_pre = 'ENT_MODEL' AND bus_ent_inst_name_num = CAST((select ent_inst_att_str_value from bus_ent_inst_attribute where att_id = 3035 and bus_ent_inst_id = vw.bus_ent_inst_id)AS INT)) as Modelo,
	CASE	
	 WHEN (select ent_inst_att_str_value from bus_ent_inst_attribute where att_id = 3033 and bus_ent_inst_id = vw.bus_ent_inst_id) = '1' THEN 'Generador'
	 WHEN (select ent_inst_att_str_value from bus_ent_inst_attribute where att_id = 3033 and bus_ent_inst_id = vw.bus_ent_inst_id) = '2' THEN 'Camión'
	 WHEN (select ent_inst_att_str_value from bus_ent_inst_attribute where att_id = 3033 and bus_ent_inst_id = vw.bus_ent_inst_id) = '3' THEN 'Auto'
	 WHEN (select ent_inst_att_str_value from bus_ent_inst_attribute where att_id = 3033 and bus_ent_inst_id = vw.bus_ent_inst_id) = '4' THEN 'Camioneta'
	 WHEN (select ent_inst_att_str_value from bus_ent_inst_attribute where att_id = 3033 and bus_ent_inst_id = vw.bus_ent_inst_id) = '5' THEN 'Maquinaria'
	 WHEN (select ent_inst_att_str_value from bus_ent_inst_attribute where att_id = 3033 and bus_ent_inst_id = vw.bus_ent_inst_id) = '6' THEN 'Otro'
	END AS tipo_vehiculo,

	u.usr_name as nombrecreador,
	(SELECT max(pro_ele_inst_date_ready) FROM vw_consults_monitor_tasks peih LEFT JOIN bus_ent_instance bei ON bei.bus_ent_inst_id_auto = peih.bus_ent_inst_id LEFT JOIN users u on u.usr_login = peih.pro_ele_inst_user_acquired where pro_name = 'PROC_OT_VEHICULAR' AND peih.pro_inst_id = vw.pro_inst_id) as fecha_ingreso_tarea, 
	now() as fecha_hora_hoy,
	(CASE 
		WHEN (select ent_inst_att_str_value from bus_ent_inst_attribute where att_id = 1632 and bus_ent_inst_id =  vw.bus_ent_inst_id) is not NULL THEN 
			(select ent_inst_att_str_value from bus_ent_inst_attribute where att_id = 1632 and bus_ent_inst_id =  vw.bus_ent_inst_id)
		ELSE
			(select ent_inst_att_str_value from bus_ent_inst_attribute where att_id = 2753 and bus_ent_inst_id =  vw.bus_ent_inst_id)
		END
	) as usuarioEvaluacion,
	(select ent_inst_att_str_value from bus_ent_inst_attribute where att_id = 2586 and bus_ent_inst_id =  vw.bus_ent_inst_id ) as clasificacionCliente,
	CASE
		WHEN (select ent_inst_att_doc_id from bus_ent_inst_attribute where att_id = 3356 and bus_ent_inst_id =  vw.bus_ent_inst_id ) is null THEN '0' 
		ELSE '1' 
	END as factura,
	(select COUNT(att_value_8) 
		from bus_ent_instance  bei 
		LEFT JOIN bus_ent_inst_attribute AS beia ON beia.bus_ent_inst_id = bei.bus_ent_inst_id_auto 
		LEFT JOIN pro_instance as pi ON pi.bus_ent_inst_id = bei.bus_ent_inst_id_auto
		where bus_ent_inst_name_pre = 'ENT_ORDEN_TRABAJO' 
		AND pi.pro_inst_name_pre = 'PRO_EVALUACION' 
		AND (beia.att_index_id = 1 AND beia.att_id in (3160) ) 
		AND att_value_9 <> 'AUTO'
		AND beia.ent_inst_att_str_value = vw.att_value_3 and att_value_9 is not null)as componentes,
	(select ent_inst_att_dte_value from bus_ent_inst_attribute where att_id = 3158 and bus_ent_inst_id =  vw.bus_ent_inst_id) as fecha_compromiso,
	vw.pro_inst_create_date as fecha_ingreso,
	vw.bus_ent_inst_id
    FROM VW_QRY_GENERIC_PROCESS vw 
    LEFT JOIN users as u on u.usr_login = vw.pro_inst_create_user
    WHERE vw.ENV_ID=1 
    AND vw.pro_name='PROC_OT_VEHICULAR' 
    AND  vw.pro_inst_status='R'
    --AND  (vw.pro_inst_status='R' OR vw.pro_inst_status='C' OR  vw.pro_inst_status='F' OR  vw.pro_inst_status='N')
    and vw.att_value_3  like '%%514348%%'--is not null


    --select * from attribute where att_name = 'VEHI_MODELO' 
    --select * from bus_entity where bus_ent_id_auto = 1001 bus_ent_name = 'ENT_MANTENEDOR_MODELO' --1147
    --select * from bus_ent_instance where  bus_ent_inst_id_auto = 208486 limit 10 


--select * from bus_ent_instance where bus_ent_inst_name_pre = 'ENT_MODEL' AND bus_ent_inst_name_num = 985