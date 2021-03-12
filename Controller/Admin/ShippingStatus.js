import React, { Component } from 'react';
import { alert, Alert } from 'react-native';
import ipCode from '../../ipcode';

export default async function(UserID, Building, Cond) {
	var ip = ipCode();
	if (UserID == 0) {
		//전체 배송완료,취소
		await fetch(`http:/${ip}:3000/User`, {
			method  : 'POST',
			headers : {
				Accept         : 'application/json',
				'Content-Type' : 'application/json'
			},
			body    : JSON.stringify({
				UserID    : UserID.toString(),
				Building  : Building,
				Condition : Cond
			})
		});
	} else {
		//개인 배송완료,취소
		await fetch(`http://${ip}:3000/User`, {
			method  : 'POST',
			headers : {
				Accept         : 'application/json',
				'Content-Type' : 'application/json'
			},
			body    : JSON.stringify({
				UserID    : UserID.toString(),
				Condition : Cond
			})
		});
	}
}
