const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

const MEALS_TABLE = process.env.MEALS_TABLE || 'meals';

const generateMockMeals = (params) => {
  const { members, days, excludeIngredients, includeIngredients, cookingTime, category } = params;
  const meals = [];
  const today = new Date();
  
  const menuOptions = [
    { name: '鶏肉とブロッコリーの炒め', time: 25, category: 'japanese', ingredients: ['鶏肉', 'ブロッコリー', '塩', 'こしょう'] },
    { name: '豚肉の生姜焼き', time: 20, category: 'japanese', ingredients: ['豚肉', '生姜', 'しょうゆ'] },
    { name: 'サーモンのムニエル', time: 30, category: 'western', ingredients: ['サーモン', 'バター', 'レモン'] },
    { name: 'チキンカレー', time: 40, category: 'other', ingredients: ['鶏肉', 'カレー粉', 'たまねぎ'] },
    { name: 'ビーフステーキ', time: 35, category: 'western', ingredients: ['牛肉', 'ガーリック', 'バター'] },
    { name: '麻婆豆腐', time: 25, category: 'chinese', ingredients: ['豆腐', '豚肉', '豆板醤'] },
    { name: 'エビチリ', time: 20, category: 'chinese', ingredients: ['えび', 'トマトソース', 'にんにく'] },
    { name: 'ナッツ類のサラダ', time: 10, category: 'western', ingredients: ['ナッツ類', 'レタス', 'ドレッシング'] }
  ];

  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    const dateStr = `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`;
    
    let availableMenus = menuOptions.filter(menu => {
      if (category && menu.category !== category) return false;
      if (cookingTime && menu.time > cookingTime) return false;
      if (excludeIngredients.length > 0 && menu.ingredients.some(ing => excludeIngredients.some(ex => ing.includes(ex)))) return false;
      if (includeIngredients.length > 0 && !includeIngredients.some(inc => menu.ingredients.some(ing => ing.includes(inc)))) return false;
      return true;
    });

    if (availableMenus.length === 0) {
      if (excludeIngredients.length > 0 || includeIngredients.length > 0) {
        throw new Error('除外食材の設定により献立を生成できません。除外食材を見直してください。');
      }
      availableMenus = menuOptions;
    }

    const selectedMenu = availableMenus[Math.floor(Math.random() * availableMenus.length)];
    meals.push({
      id: `meal-${Date.now()}-${i}`,
      date: dateStr,
      menu: selectedMenu.name,
      cookingTime: selectedMenu.time,
      rating: Math.floor(Math.random() * 5) + 1,
      members: members,
      nutrition: `カロリー: ${Math.floor(Math.random() * 500) + 300}kcal`
    });
  }

  return meals;
};

exports.handler = async (event) => {
  console.log('Event:', JSON.stringify(event));

  const path = event.path || event.rawPath || '';
  const method = event.httpMethod || event.requestContext?.http?.method || 'GET';
  const body = event.body ? JSON.parse(event.body) : {};

  try {
    if (path.includes('/meals/generate') && method === 'POST') {
      const meals = generateMockMeals(body);
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ meals })
      };
    }

    if (path.includes('/meals') && method === 'GET') {
      const params = { TableName: MEALS_TABLE };
      const result = await dynamodb.scan(params).promise();
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ meals: result.Items || [] })
      };
    }

    if (path.includes('/meals') && method === 'DELETE') {
      const mealId = body.id;
      await dynamodb.delete({ TableName: MEALS_TABLE, Key: { id: mealId } }).promise();
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ success: true })
      };
    }

    return {
      statusCode: 404,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Not found' })
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: error.message })
    };
  }
};