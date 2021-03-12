export default async function Notification(UserID, Token, Name, Cond) {
	if (UserID == 0) {
		for (let i = 0; i < Token.length; i++) {
			const message = {
				to                   : Token[i].알림코드,
				sound                : 'default',
				title                : Token[i].이름 + ' 님의 배송상태',
				body                 : Cond + ' 되었습니다',
				data                 : { data: 'goes here' },
				_displayInForeground : true
			};
			const response = await fetch('https://exp.host/--/api/v2/push/send', {
				method  : 'POST',
				headers : {
					Accept            : 'application/json',
					'Accept-encoding' : 'gzip, deflate',
					'Content-Type'    : 'application/json'
				},
				body    : JSON.stringify(message)
			});
		}
	} else {
		const message = {
			to                   : Token,
			sound                : 'default',
			title                : Name + ' 님의 배송상태',
			body                 : Cond + ' 되었습니다',
			data                 : { data: 'goes here' },
			_displayInForeground : true
		};
		const response = await fetch('https://exp.host/--/api/v2/push/send', {
			method  : 'POST',
			headers : {
				Accept            : 'application/json',
				'Accept-encoding' : 'gzip, deflate',
				'Content-Type'    : 'application/json'
			},
			body    : JSON.stringify(message)
		});
	}
}
